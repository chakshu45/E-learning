const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
    // Data Structures
    {
        subject: 'Data Structures',
        difficulty: 'Easy',
        text: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 2,
        explanation: 'In a balanced BST, each comparison eliminates half of the remaining nodes, leading to a logarithmic time complexity.',
        tags: ['BST', 'Search', 'Time Complexity']
    },
    {
        subject: 'Data Structures',
        difficulty: 'Medium',
        text: 'Which data structure is best suited for implementing a LIFO (Last-In-First-Out) behavior?',
        options: ['Queue', 'Stack', 'Linked List', 'Heap'],
        correctAnswer: 1,
        explanation: 'A stack follows the LIFO principle where the last element added is the first one to be removed.',
        tags: ['Stack', 'LIFO']
    },
    // Operating Systems
    {
        subject: 'Operating Systems',
        difficulty: 'Easy',
        text: 'What is a "Deadlock" in an operating system?',
        options: [
            'A situation where a process is waiting for an event that will never occur',
            'A process that has finished execution but still has an entry in the process table',
            'A situation where two or more processes are waiting for each other to release resources',
            'A sudden crash of the operating system'
        ],
        correctAnswer: 2,
        explanation: 'Deadlock is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
        tags: ['Deadlock', 'Process Management']
    },
    {
        subject: 'Operating Systems',
        difficulty: 'Medium',
        text: 'Which CPU scheduling algorithm can suffer from the "Convoy Effect"?',
        options: ['Round Robin', 'First-Come, First-Served (FCFS)', 'Shortest Job First (SJF)', 'Priority Scheduling'],
        correctAnswer: 1,
        explanation: 'FCFS can lead to the convoy effect where short processes wait for one long process to release the CPU.',
        tags: ['Scheduling', 'FCFS']
    },
    // DBMS
    {
        subject: 'DBMS',
        difficulty: 'Easy',
        text: 'What does ACID stand for in the context of database transactions?',
        options: [
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Completeness, Integration, Distribution',
            'Access, Control, Information, Database',
            'Always, Consistent, Instant, Digital'
        ],
        correctAnswer: 0,
        explanation: 'ACID properties ensure that database transactions are processed reliably.',
        tags: ['ACID', 'Transactions']
    },
    {
        subject: 'DBMS',
        difficulty: 'Medium',
        text: 'Which normal form is concerned with eliminating transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 2,
        explanation: '3NF requires that all non-key attributes are functionally dependent only on the primary key, eliminating transitive dependencies.',
        tags: ['Normalization', '3NF']
    },
    // Computer Networks
    {
        subject: 'Computer Networks',
        difficulty: 'Easy',
        text: 'Which layer of the OSI model is responsible for routing packets across different networks?',
        options: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Session Layer'],
        correctAnswer: 2,
        explanation: 'The Network Layer (Layer 3) handles routing and logical addressing (IP addresses).',
        tags: ['OSI', 'Network Layer', 'Routing']
    },
    {
        subject: 'Computer Networks',
        difficulty: 'Medium',
        text: 'What is the primary purpose of the ARP protocol?',
        options: [
            'Resolving IP addresses to MAC addresses',
            'Mapping domain names to IP addresses',
            'Assigning dynamic IP addresses to devices',
            'Encrypting data for secure transmission'
        ],
        correctAnswer: 0,
        explanation: 'Address Resolution Protocol (ARP) is used to find the hardware (MAC) address of a host from its known IP address.',
        tags: ['ARP', 'IP', 'MAC']
    },
    // OOPs
    {
        subject: 'OOPs',
        difficulty: 'Easy',
        text: 'Which pillar of OOPs refers to hiding internal details and showing only functionality?',
        options: ['Inheritance', 'Encapsulation', 'Abstraction', 'Polymorphism'],
        correctAnswer: 2,
        explanation: 'Abstraction is the process of hiding the implementation details and showing only the functionality to the user.',
        tags: ['OOPs', 'Abstraction']
    },
    {
        subject: 'OOPs',
        difficulty: 'Medium',
        text: 'What is the capability of an object to take on many forms called?',
        options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Overloading'],
        correctAnswer: 1,
        explanation: 'Polymorphism allows one interface to be used for a general class of actions. The specific action is determined by the exact nature of the situation.',
        tags: ['OOPs', 'Polymorphism']
    },
    // Algorithms
    {
        subject: 'Algorithms',
        difficulty: 'Easy',
        text: 'Which algorithm is used to find the shortest path in a weighted graph with no negative edges?',
        options: ['Breadth-First Search (BFS)', "Dijkstra's Algorithm", 'Binary Search', 'Merge Sort'],
        correctAnswer: 1,
        explanation: "Dijkstra's algorithm finds the shortest path between nodes in a graph.",
        tags: ['Algorithms', 'Graph', 'Shortest Path']
    },
    {
        subject: 'Algorithms',
        difficulty: 'Medium',
        text: 'What is the average time complexity of QuickSort?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'QuickSort has an average and best-case time complexity of O(n log n), though its worst-case is O(n^2).',
        tags: ['Algorithms', 'Sorting', 'QuickSort']
    },
    // Web Development
    {
        subject: 'Web Development',
        difficulty: 'Easy',
        text: 'What does CSS stand for?',
        options: ['Creative Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'],
        correctAnswer: 2,
        explanation: 'Cascading Style Sheets (CSS) is used to style and lay out web pages.',
        tags: ['WebDev', 'CSS']
    },
    {
        subject: 'Web Development',
        difficulty: 'Medium',
        text: 'Which React hook is used to handle side effects in functional components?',
        options: ['useState', 'useContext', 'useEffect', 'useReducer'],
        correctAnswer: 2,
        explanation: 'useEffect tells React that your component needs to do something after render.',
        tags: ['React', 'Hooks', 'WebDev']
    },
    // Cloud Computing
    {
        subject: 'Cloud Computing',
        difficulty: 'Medium',
        text: 'What does "SaaS" stand for in cloud computing?',
        options: ['Storage as a Service', 'Software as a Service', 'System as a Service', 'Security as a Service'],
        correctAnswer: 1,
        explanation: 'Software as a Service (SaaS) allows users to connect to and use cloud-based apps over the Internet.',
        tags: ['Cloud', 'SaaS']
    },
    // Cyber Security
    {
        subject: 'Cyber Security',
        difficulty: 'Medium',
        text: 'Which type of attack involves redirecting a user from a legitimate website to a fraudulent one?',
        options: ['Phishing', 'Man-in-the-middle', 'Pharming', 'SQL Injection'],
        correctAnswer: 2,
        explanation: "Pharming is a cyberattack intended to redirect a website's traffic to another, fake site.",
        tags: ['Security', 'Attacks']
    },
    // Software Engineering
    {
        subject: 'Software Engineering',
        difficulty: 'Easy',
        text: 'What does the "S" in SOLID principles stand for?',
        options: ['Shared Responsibility', 'Single Responsibility', 'System Scalability', 'Software Stability'],
        correctAnswer: 1,
        explanation: 'The Single Responsibility Principle states that a class should have one, and only one, reason to change.',
        tags: ['SoftwareEngineering', 'SOLID']
    },
    {
        subject: 'Software Engineering',
        difficulty: 'Easy',
        text: 'What does the "S" in SOLID principles stand for?',
        options: ['Shared Responsibility', 'Single Responsibility', 'System Scalability', 'Software Stability'],
        correctAnswer: 1,
        explanation: 'The Single Responsibility Principle states that a class should have one, and only one, reason to change.',
        tags: ['SoftwareEngineering', 'SOLID']
    },
    {
        subject: 'Data Structures',
        difficulty: 'Easy',
        text: 'Which of the following is a linear data structure?',
        options: ['Tree', 'Graph', 'Array', 'Heap'],
        correctAnswer: 2,
        explanation: 'An array is a linear data structure where elements are stored in contiguous memory locations.',
        tags: ['DataStructures', 'Array']
    },
    {
        subject: 'Algorithms',
        difficulty: 'Medium',
        text: 'Which design pattern is used in the Merge Sort algorithm?',
        options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
        correctAnswer: 2,
        explanation: 'Merge Sort works by recursively dividing the array into sub-arrays until they are of size 1, then merging them back in sorted order.',
        tags: ['Algorithms', 'MergeSort', 'DivideAndConquer']
    },
    {
        subject: 'Operating Systems',
        difficulty: 'Medium',
        text: 'What is the purpose of a translation lookaside buffer (TLB)?',
        options: ['To store frequently used data', 'To speed up virtual to physical address translation', 'To handle hardware interrupts', 'To manage process priorities'],
        correctAnswer: 1,
        explanation: 'A TLB is a memory cache that stores recent translations of virtual memory to physical addresses to improve performance.',
        tags: ['OS', 'TLB', 'Memory']
    },
    {
        subject: 'DBMS',
        difficulty: 'Easy',
        text: 'Which SQL command is used to remove all records from a table without deleting the table structure?',
        options: ['DROP', 'DELETE', 'TRUNCATE', 'REMOVE'],
        correctAnswer: 2,
        explanation: 'TRUNCATE removes all rows from a table, but the table structure and its columns, constraints, indexes, and so on remain.',
        tags: ['DBMS', 'SQL', 'Truncate']
    },
    {
        subject: 'OOPs',
        difficulty: 'Medium',
        text: 'Which of the following is NOT a type of inheritance?',
        options: ['Single', 'Multiple', 'Circular', 'Multilevel'],
        correctAnswer: 2,
        explanation: 'Circular inheritance is not a standard type of inheritance and is usually prohibited in most OOP languages.',
        tags: ['OOPs', 'Inheritance']
    }
];

const seedQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/elearning');
        console.log('Connected to MongoDB for seeding questions...');
        
        await Question.deleteMany();
        console.log('Cleared existing questions.');

        await Question.insertMany(questions);
        console.log('Successfully seeded mock questions.');
        
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedQuestions();
