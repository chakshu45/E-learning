require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Seed: Connected to DB');

        // Clear existing data
        await User.deleteMany();
        await Course.deleteMany();
        await Lesson.deleteMany();

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@learnwithsky.com',
            password: 'password123',
            role: 'admin'
        });

        // Create Instructor
        const instructor = await User.create({
            name: 'Dr. Angela Yu',
            email: 'angela@example.com',
            password: 'password123',
            role: 'instructor'
        });

        // Create Course 1
        const course1 = await Course.create({
            title: 'Complete Web Development Bootcamp 2026',
            subtitle: 'Become a Full-Stack Web Developer with just ONE course.',
            description: 'Learn HTML, CSS, JavaScript, Node, React, MongoDB and more!',
            price: 94.99,
            instructor: instructor._id,
            category: 'Development',
            level: 'Beginner',
            rating: 4.8,
            isPublished: true
        });

        // Create Lessons for Course 1
        await Lesson.create([
            { course: course1._id, title: 'Introduction', videoUrl: 'https://youtube.com/link1', order: 1, duration: '10:00' },
            { course: course1._id, title: 'HTML Basics', videoUrl: 'https://youtube.com/link2', order: 2, duration: '45:00' },
            { course: course1._id, title: 'CSS Masterclass', videoUrl: 'https://youtube.com/link3', order: 3, duration: '1:30:00' }
        ]);

        // Create Course 2 (Indian Market - Computer Science)
        const course2 = await Course.create({
            title: 'Mastering DSA for Indian Placements (Java + C++)',
            subtitle: 'Crack top product-based companies like Amazon, Microsoft, and Google India.',
            description: 'This course is specifically designed for Indian engineering students. We cover all major DSA topics, competitive programming basics, and mock interview questions common in Indian tech hiring.',
            price: 29.99,
            instructor: instructor._id,
            category: 'Computer Science',
            level: 'Intermediate',
            rating: 4.9,
            isPublished: true
        });

        // Create Lessons for Course 2
        await Lesson.create([
            { course: course2._id, title: 'Introduction to Placements in India', videoUrl: 'https://youtube.com/watch?v=dsa1', order: 1, duration: '15:00' },
            { course: course2._id, title: 'Time & Space Complexity Analysis', videoUrl: 'https://youtube.com/watch?v=dsa2', order: 2, duration: '35:00' },
            { course: course2._id, title: 'Arrays & Strings - Interview Patterns', videoUrl: 'https://youtube.com/watch?v=dsa3', order: 3, duration: '1:10:00' },
            { course: course2._id, title: 'Linked Lists & Stacks', videoUrl: 'https://youtube.com/watch?v=dsa4', order: 4, duration: '1:45:00' }
        ]);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
