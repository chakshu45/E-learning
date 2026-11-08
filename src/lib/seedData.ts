import connectDB from "./db";
import User from "@/models/User";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Question from "@/models/Question";
import Enrollment from "@/models/Enrollment";
import TestAttempt from "@/models/TestAttempt";

export const initialQuestions = [
  // Data Structures
  {
    subject: "Data Structures",
    difficulty: "Easy",
    text: "What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "In a balanced BST, each comparison eliminates half of the remaining nodes, leading to logarithmic time complexity.",
    tags: ["BST", "Search", "Time Complexity"]
  },
  {
    subject: "Data Structures",
    difficulty: "Medium",
    text: "Which data structure is best suited for implementing a LIFO (Last-In-First-Out) behavior?",
    options: ["Queue", "Stack", "Linked List", "Heap"],
    correctAnswer: 1,
    explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed.",
    tags: ["Stack", "LIFO"]
  },
  {
    subject: "Data Structures",
    difficulty: "Easy",
    text: "Which of the following is a linear data structure?",
    options: ["Tree", "Graph", "Array", "Heap"],
    correctAnswer: 2,
    explanation: "An array is a linear data structure where elements are stored in contiguous memory locations.",
    tags: ["DataStructures", "Array"]
  },
  // Operating Systems
  {
    subject: "Operating Systems",
    difficulty: "Easy",
    text: "What is a 'Deadlock' in an operating system?",
    options: [
      "A situation where a process is waiting for an event that will never occur",
      "A process that has finished execution but still has an entry in the process table",
      "A situation where two or more processes are waiting for each other to release resources",
      "A sudden crash of the operating system"
    ],
    correctAnswer: 2,
    explanation: "Deadlock is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.",
    tags: ["Deadlock", "Process Management"]
  },
  {
    subject: "Operating Systems",
    difficulty: "Medium",
    text: "Which CPU scheduling algorithm can suffer from the 'Convoy Effect'?",
    options: ["Round Robin", "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling"],
    correctAnswer: 1,
    explanation: "FCFS can lead to the convoy effect where short processes wait for one long process to release the CPU.",
    tags: ["Scheduling", "FCFS"]
  },
  {
    subject: "Operating Systems",
    difficulty: "Medium",
    text: "What is the purpose of a translation lookaside buffer (TLB)?",
    options: [
      "To store frequently used data",
      "To speed up virtual to physical address translation",
      "To handle hardware interrupts",
      "To manage process priorities"
    ],
    correctAnswer: 1,
    explanation: "A TLB is a memory cache that stores recent translations of virtual memory to physical addresses to improve performance.",
    tags: ["OS", "TLB", "Memory"]
  },
  // DBMS
  {
    subject: "DBMS",
    difficulty: "Easy",
    text: "What does ACID stand for in the context of database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Completeness, Integration, Distribution",
      "Access, Control, Information, Database",
      "Always, Consistent, Instant, Digital"
    ],
    correctAnswer: 0,
    explanation: "ACID properties ensure that database transactions are processed reliably.",
    tags: ["ACID", "Transactions"]
  },
  {
    subject: "DBMS",
    difficulty: "Medium",
    text: "Which normal form is concerned with eliminating transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 2,
    explanation: "3NF requires that all non-key attributes are functionally dependent only on the primary key, eliminating transitive dependencies.",
    tags: ["Normalization", "3NF"]
  },
  {
    subject: "DBMS",
    difficulty: "Easy",
    text: "Which SQL command is used to remove all records from a table without deleting the table structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    correctAnswer: 2,
    explanation: "TRUNCATE removes all rows from a table, but the table structure and its columns, constraints, indexes remain.",
    tags: ["DBMS", "SQL", "Truncate"]
  },
  // Computer Networks
  {
    subject: "Computer Networks",
    difficulty: "Easy",
    text: "Which layer of the OSI model is responsible for routing packets across different networks?",
    options: ["Data Link Layer", "Transport Layer", "Network Layer", "Session Layer"],
    correctAnswer: 2,
    explanation: "The Network Layer (Layer 3) handles routing and logical addressing (IP addresses).",
    tags: ["OSI", "Network Layer", "Routing"]
  },
  {
    subject: "Computer Networks",
    difficulty: "Medium",
    text: "What is the primary purpose of the ARP protocol?",
    options: [
      "Resolving IP addresses to MAC addresses",
      "Mapping domain names to IP addresses",
      "Assigning dynamic IP addresses to devices",
      "Encrypting data for secure transmission"
    ],
    correctAnswer: 0,
    explanation: "Address Resolution Protocol (ARP) is used to find the hardware (MAC) address of a host from its known IP address.",
    tags: ["ARP", "IP", "MAC"]
  },
  // OOPs
  {
    subject: "OOPs",
    difficulty: "Easy",
    text: "Which pillar of OOPs refers to hiding internal details and showing only functionality?",
    options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"],
    correctAnswer: 2,
    explanation: "Abstraction is the process of hiding implementation details and showing only functionality to the user.",
    tags: ["OOPs", "Abstraction"]
  },
  {
    subject: "OOPs",
    difficulty: "Medium",
    text: "What is the capability of an object to take on many forms called?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Overloading"],
    correctAnswer: 1,
    explanation: "Polymorphism allows one interface to be used for a general class of actions.",
    tags: ["OOPs", "Polymorphism"]
  },
  {
    subject: "OOPs",
    difficulty: "Medium",
    text: "Which of the following is NOT a standard type of inheritance?",
    options: ["Single", "Multiple", "Circular", "Multilevel"],
    correctAnswer: 2,
    explanation: "Circular inheritance is not a standard type and is forbidden in modern OOP.",
    tags: ["OOPs", "Inheritance"]
  },
  // Algorithms
  {
    subject: "Algorithms",
    difficulty: "Easy",
    text: "Which algorithm is used to find the shortest path in a weighted graph with no negative edges?",
    options: ["Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Binary Search", "Merge Sort"],
    correctAnswer: 1,
    explanation: "Dijkstra's algorithm finds the shortest path between nodes in a graph with non-negative edge weights.",
    tags: ["Algorithms", "Graph", "Shortest Path"]
  },
  {
    subject: "Algorithms",
    difficulty: "Medium",
    text: "What is the average time complexity of QuickSort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswer: 1,
    explanation: "QuickSort has an average and best-case time complexity of O(n log n).",
    tags: ["Algorithms", "Sorting", "QuickSort"]
  },
  {
    subject: "Algorithms",
    difficulty: "Medium",
    text: "Which design pattern is used in the Merge Sort algorithm?",
    options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
    correctAnswer: 2,
    explanation: "Merge Sort recursively divides arrays into sub-arrays and then merges them back in sorted order.",
    tags: ["Algorithms", "MergeSort", "DivideAndConquer"]
  },
  // Web Development
  {
    subject: "Web Development",
    difficulty: "Easy",
    text: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
    correctAnswer: 2,
    explanation: "Cascading Style Sheets (CSS) is used to style and lay out web pages.",
    tags: ["WebDev", "CSS"]
  },
  {
    subject: "Web Development",
    difficulty: "Medium",
    text: "Which React hook is used to handle side effects in functional components?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    correctAnswer: 2,
    explanation: "useEffect is used to perform side effects like data fetching or subscriptions in components.",
    tags: ["React", "Hooks", "WebDev"]
  },
  // Cloud Computing
  {
    subject: "Cloud Computing",
    difficulty: "Medium",
    text: "What does 'SaaS' stand for in cloud computing?",
    options: ["Storage as a Service", "Software as a Service", "System as a Service", "Security as a Service"],
    correctAnswer: 1,
    explanation: "Software as a Service (SaaS) enables users to connect to and use cloud-based applications over the internet.",
    tags: ["Cloud", "SaaS"]
  },
  // Cyber Security
  {
    subject: "Cyber Security",
    difficulty: "Medium",
    text: "Which type of attack involves redirecting a user from a legitimate website to a fraudulent one?",
    options: ["Phishing", "Man-in-the-middle", "Pharming", "SQL Injection"],
    correctAnswer: 2,
    explanation: "Pharming is a cyberattack intended to redirect traffic from a legitimate site to a fraudulent site.",
    tags: ["Security", "Attacks"]
  },
  // Software Engineering
  {
    subject: "Software Engineering",
    difficulty: "Easy",
    text: "What does the 'S' in SOLID principles stand for?",
    options: ["Shared Responsibility", "Single Responsibility", "System Scalability", "Software Stability"],
    correctAnswer: 1,
    explanation: "The Single Responsibility Principle asserts that a class should have one, and only one, reason to change.",
    tags: ["SoftwareEngineering", "SOLID"]
  }
];

export async function seedAllData(force = false) {
  await connectDB();

  if (!force) {
    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      console.log("[Seed] Database already has data. Skipping seed.");
      return { seeded: false, message: "Database already populated" };
    }
  }

  console.log("[Seed] Clearing collections...");
  await User.deleteMany();
  await Course.deleteMany();
  await Lesson.deleteMany();
  await Question.deleteMany();
  await Enrollment.deleteMany();
  await TestAttempt.deleteMany();

  console.log("[Seed] Creating Admin and Instructor users...");
  const admin = await User.create({
    name: "Admin User",
    email: "admin@learnwithsky.com",
    password: "password123",
    role: "admin",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    bio: "Chief Educator and Platform Administrator."
  });

  const instructor = await User.create({
    name: "Anuj LearnWithSky",
    email: "anuj@learnwithsky.com",
    password: "password123",
    role: "instructor",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bio: "Senior Software Architect and educator with 10+ years experience."
  });

  console.log("[Seed] Creating courses...");
  const webCourse = await Course.create({
    title: "The Complete Web Development Bootcamp",
    subtitle: "Become a Full-Stack Web Developer with just ONE course.",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, Next.js, and MongoDB from industry experts.",
    price: 499,
    originalPrice: 3899,
    instructor: instructor._id,
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    numReviews: 1240,
    isPublished: true,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  });

  const reactCourse = await Course.create({
    title: "React & Next.js - The Complete Guide 2026",
    subtitle: "Dive in and learn React.js and Next.js App Router from scratch!",
    description: "Hooks, Server Components, App Router, SSR, Framer Motion, and scalable frontend architecture.",
    price: 599,
    originalPrice: 3499,
    instructor: instructor._id,
    category: "Development",
    level: "Intermediate",
    rating: 4.9,
    numReviews: 980,
    isPublished: true,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  });

  const sqlCourse = await Course.create({
    title: "The Complete SQL Bootcamp: Zero to Hero",
    subtitle: "Become an expert at SQL and Database Engineering!",
    description: "Learn SQL for Data Analysis, Indexing, Performance Tuning, and Backend Systems.",
    price: 399,
    originalPrice: 2999,
    instructor: instructor._id,
    category: "Business",
    level: "Beginner",
    rating: 4.7,
    numReviews: 650,
    isPublished: true,
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
  });

  const awsCourse = await Course.create({
    title: "AWS Certified Solutions Architect Associate",
    subtitle: "Pass the AWS Certified Solutions Architect Associate Exam!",
    description: "Comprehensive coverage of EC2, S3, RDS, Lambda, ECS, VPC, IAM, and cloud architecture patterns.",
    price: 699,
    originalPrice: 4500,
    instructor: instructor._id,
    category: "IT & Software",
    level: "Intermediate",
    rating: 4.9,
    numReviews: 1580,
    isPublished: true,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  });

  console.log("[Seed] Creating lessons...");
  await Lesson.create([
    {
      course: webCourse._id,
      title: "Introduction to Modern Web Architecture",
      videoUrl: "https://www.youtube.com/embed/9TlHvipP5yA",
      order: 1,
      duration: "10:00",
      content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. In this lesson, we cover the basic structure of an HTML document, semantic HTML5 tags, and modern web application rendering paradigms."
    },
    {
      course: webCourse._id,
      title: "Full-Stack Development with Next.js",
      videoUrl: "https://www.youtube.com/embed/9TlHvipP5yA",
      order: 2,
      duration: "18:30",
      content: "Next.js brings React to full fruition with server components, streaming, integrated API routes, and best-in-class performance. Here we dissect the App Router and data fetching strategies."
    },
    {
      course: reactCourse._id,
      title: "Understanding React 19 & Component Trees",
      videoUrl: "https://www.youtube.com/embed/9TlHvipP5yA",
      order: 1,
      duration: "15:00",
      content: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Key concepts covered include the Virtual DOM, reconciliation, and unidirectional data flow."
    },
    {
      course: reactCourse._id,
      title: "Deep Dive into Hooks & State Management",
      videoUrl: "https://www.youtube.com/embed/9TlHvipP5yA",
      order: 2,
      duration: "22:00",
      content: "Hooks let you use state and other React features without writing a class. We study useState, useEffect, useMemo, and custom hooks."
    }
  ]);

  console.log("[Seed] Seeding questions...");
  await Question.insertMany(initialQuestions);

  console.log("[Seed] Enrolling Admin in sample courses...");
  await Enrollment.create({
    user: admin._id,
    course: webCourse._id,
    progress: 50,
    paymentStatus: "completed"
  });
  await Enrollment.create({
    user: admin._id,
    course: sqlCourse._id,
    progress: 100,
    paymentStatus: "completed"
  });

  console.log("[Seed] Finished seeding successfully!");
  return { seeded: true, message: "Data seeded successfully!" };
}

export async function seedDataIfEmpty() {
  await connectDB();
  const count = await Course.countDocuments();
  if (count === 0) {
    console.log("[Seed] Database empty, auto-seeding...");
    return await seedAllData(false);
  }
  return { seeded: false, message: "Database already populated" };
}
