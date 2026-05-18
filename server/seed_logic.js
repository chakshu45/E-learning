const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const Question = require('./models/Question');
const Enrollment = require('./models/Enrollment');
const TestAttempt = require('./models/TestAttempt');

const questions = [
    // ... (questions remain same)
    { subject: 'Data Structures', difficulty: 'Easy', text: 'What is O(1)?', options: ['Constant', 'Linear', 'Log', 'Quad'], correctAnswer: 0 },
    { subject: 'Operating Systems', difficulty: 'Easy', text: 'What is a Kernel?', options: ['Shell', 'Core', 'App', 'Driver'], correctAnswer: 1 }
];

const seedData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();
        await Lesson.deleteMany();
        await Question.deleteMany();
        await Enrollment.deleteMany();
        await TestAttempt.deleteMany();

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@learnwithsky.com',
            password: 'password123',
            role: 'admin',
            profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
        });

        const instructor = await User.create({
            name: 'Anuj LearnWithSky',
            email: 'anuj@learnwithsky.com',
            password: 'password123',
            role: 'instructor',
            profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
        });

        // --- Development ---
        const webCourse = await Course.create({
            title: 'The Complete Web Development Bootcamp',
            subtitle: 'Become a Full-Stack Web Developer with just ONE course.',
            description: 'Learn HTML, CSS, JS, Node, and React.',
            price: 499,
            originalPrice: 3899,
            instructor: instructor._id,
            category: 'Development',
            level: 'Beginner',
            rating: 4.7,
            isPublished: true,
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
        });

        const reactCourse = await Course.create({
            title: 'React - The Complete Guide 2026',
            subtitle: 'Dive in and learn React.js from scratch!',
            description: 'Hooks, Redux, React Router, Next.js and more.',
            price: 599,
            originalPrice: 3499,
            instructor: instructor._id,
            category: 'Development',
            level: 'Intermediate',
            rating: 4.8,
            isPublished: true,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
        });

        // --- Business ---
        const sqlCourse = await Course.create({
            title: 'The Complete SQL Bootcamp: Zero to Hero',
            subtitle: 'Become an expert at SQL!',
            description: 'Learn SQL for Data Analysis, Marketing, and Web Development.',
            price: 399,
            originalPrice: 2999,
            instructor: instructor._id,
            category: 'Business',
            level: 'Beginner',
            rating: 4.6,
            isPublished: true,
            thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800'
        });

        // --- IT & Software ---
        const awsCourse = await Course.create({
            title: 'AWS Certified Solutions Architect Associate',
            subtitle: 'Pass the AWS Certified Solutions Architect Associate Exam!',
            description: 'Everything you need to know to pass the exam.',
            price: 699,
            originalPrice: 4500,
            instructor: instructor._id,
            category: 'IT & Software',
            level: 'Intermediate',
            rating: 4.9,
            isPublished: true,
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
        });

        await Lesson.create([
            { 
                course: webCourse._id, 
                title: 'Introduction to HTML', 
                videoUrl: 'https://www.youtube.com/embed/9TlHvipP5yA', 
                order: 1, 
                duration: '10:00',
                content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. In this lesson, we cover the basic structure of an HTML document, including <!DOCTYPE html>, <html>, <head>, and <body> tags. We also discuss common elements like headings (h1-h6) and paragraphs (p).'
            },
            { 
                course: reactCourse._id, 
                title: 'What is React?', 
                videoUrl: 'https://www.youtube.com/embed/9TlHvipP5yA', 
                order: 1, 
                duration: '15:00',
                content: 'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies. Key concepts covered in this note include: Virtual DOM, Component-Based Architecture, and Declarative UI.'
            }
        ]);
        
        await Question.insertMany(questions);

        // Auto-enroll admin in some
        await Enrollment.create({ user: admin._id, course: webCourse._id, progress: 20 });
        await Enrollment.create({ user: admin._id, course: sqlCourse._id, progress: 50 });

        console.log('Auto-Seed: Data Seeded Successfully (Udemy-Style)');
    } catch (error) {
        console.error(`Auto-Seed Error: ${error.message}`);
    }
};

module.exports = seedData;
