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
            name: 'Learn With Sky',
            email: 'anuj@learnwithsky.com',
            password: 'password123',
            role: 'instructor'
        });

        // Java Course
        const javaCourse = await Course.create({
            title: 'Java Placement Bootcamp 2026',
            subtitle: 'Master Java from Scratch to Advanced.',
            description: 'Learn Java syntax, Collections, Multi-threading, and Exception handling. Perfect for campus placements.',
            price: 2499,
            originalPrice: 4999,
            instructor: instructor._id,
            category: 'Programming',
            level: 'Beginner',
            rating: 4.8,
            isPublished: true
        });

        // DSA Course
        const dsaCourse = await Course.create({
            title: 'Data Structures & Algorithms (DSA) Mastery',
            subtitle: 'Ace your technical interviews at MAANG.',
            description: 'Complete DSA course covering Arrays, Linked Lists, Trees, Graphs, and DP. Solving 500+ LeetCode problems.',
            price: 3499,
            originalPrice: 6999,
            instructor: instructor._id,
            category: 'Computer Science',
            level: 'Intermediate',
            rating: 4.9,
            isPublished: true
        });

        // Python Course
        const pythonCourse = await Course.create({
            title: 'Python for Data Science & AI',
            subtitle: 'The most versatile language for the future.',
            description: 'Learn Python, NumPy, Pandas, and Matplotlib. Introduction to Machine Learning and AI models.',
            price: 1999,
            originalPrice: 3999,
            instructor: instructor._id,
            category: 'Data Science',
            level: 'Beginner',
            rating: 4.7,
            isPublished: true
        });

        // OOPs Course
        const oopsCourse = await Course.create({
            title: 'Object Oriented Programming (OOPs) Design',
            subtitle: 'Learn to write clean, scalable, and reusable code.',
            description: 'Master the 4 pillars of OOPs: Encapsulation, Abstraction, Inheritance, and Polymorphism. Design Patterns included.',
            price: 1499,
            originalPrice: 2999,
            instructor: instructor._id,
            category: 'Software Engineering',
            level: 'Intermediate',
            rating: 4.8,
            isPublished: true
        });

        // Create some lessons for one course as sample
        await Lesson.create([
            { course: javaCourse._id, title: 'Introduction to Java', videoUrl: 'https://youtube.com/watch?v=java1', order: 1, duration: '15:00' },
            { course: javaCourse._id, title: 'Installing JDK & IntelliJ', videoUrl: 'https://youtube.com/watch?v=java2', order: 2, duration: '20:00' },
            { course: dsaCourse._id, title: 'Time Complexity Analysis', videoUrl: 'https://youtube.com/watch?v=dsa1', order: 1, duration: '45:00' }
        ]);


        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
