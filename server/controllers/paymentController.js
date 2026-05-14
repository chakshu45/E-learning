const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Create Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if already enrolled and payment completed
    const existingEnrollment = await Enrollment.findOne({
        user: req.user._id,
        course: courseId,
        paymentStatus: 'completed'
    });

    if (existingEnrollment) {
        res.status(400);
        throw new Error('Already enrolled in this course');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: course.title,
                            description: course.subtitle,
                            images: course.thumbnail ? [course.thumbnail] : [],
                        },
                        unit_amount: course.price * 100, // Stripe expects amount in cents/paise
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/courses/${courseId}`,
            metadata: {
                courseId: courseId.toString(),
                userId: req.user._id.toString(),
            },
        });

        // Create a pending enrollment
        await Enrollment.findOneAndUpdate(
            { user: req.user._id, course: courseId },
            { 
                stripeSessionId: session.id,
                paymentStatus: 'pending'
            },
            { upsert: true, new: true }
        );

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// @desc    Verify Stripe Payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const { sessionId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const enrollment = await Enrollment.findOneAndUpdate(
                { stripeSessionId: sessionId },
                { paymentStatus: 'completed' },
                { new: true }
            );

            if (!enrollment) {
                res.status(404);
                throw new Error('Enrollment not found');
            }

            res.json({ success: true, enrollment });
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

module.exports = { createCheckoutSession, verifyPayment };
