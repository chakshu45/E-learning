# LearnWithSky - Full-Stack E-Learning Platform (Next.js)

A premium, scalable, cinematic e-learning platform built entirely with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- **Unified Next.js Full-Stack Architecture**: Frontend UI and Backend Route Handlers running seamlessly under a single Next.js project.
- **Interactive Course Discovery**: Filter courses by category, search in real-time, view pricing, and syllabus details.
- **Cinematic Learning Player**: 4K video playback with active lesson progress tracking and interactive coding Mini-Challenges.
- **Verified Certificates**: Automatic issuance and PDF generation upon 100% curriculum completion.
- **Comprehensive Study Materials**: Deep-dive roadmaps and cheat-sheet downloads for DevOps, Computer Networks, Spring Boot, DBMS, OS, and MERN.
- **Interactive Practice Arena**: Timed and untimed mock tests with instant score calculation, radar mastery charts, and detailed question-by-question reviews.
- **AI Learning Assistant (SkyAI)**: Integrated chatbot ready to answer technical questions and guide learning paths.
- **Admin Console & Seed Tooling**: One-click database auto-seeding with realistic courses, instructors, lessons, and practice questions.
- **Dual Database Strategy**: Seamlessly connects to local MongoDB / MongoDB Atlas, with automatic in-memory MongoDB fallback.

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended, tested on Node v20/v26)
- **MongoDB** running locally OR a **MongoDB Atlas** connection string (optional: in-memory DB will start automatically if MongoDB is not present).

### 2. Environment Variables
A `.env.local` file is pre-configured with defaults:
```env
MONGO_URI=mongodb://localhost:27017/learnwithsky
JWT_SECRET=learnwithsky_super_secret_jwt_key_2026
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_ID=
STRIPE_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_API_URL=/api
CLIENT_URL=http://localhost:3000
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Seed the Database
To populate the database with courses, sample admin/instructor accounts, and practice questions:
```bash
npm run seed
```
Or simply visit [http://localhost:3000/admin](http://localhost:3000/admin) and click **"Reset & Seed Database"**.

---

## 🔑 Sample Credentials
- **Admin**: `admin@learnwithsky.com` / `password123`
- **Instructor**: `anuj@learnwithsky.com` / `password123`

---

## 📁 Project Structure

```
├── public/                 # Static assets, SVGs, and downloadable PDF cheat sheets
├── scripts/
│   └── seed.ts             # Standalone TypeScript database seeding script
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   │   ├── api/            # Full-Stack API Route Handlers (/api/auth, /api/courses, /api/enroll, etc.)
│   │   ├── admin/          # Admin Console
│   │   ├── courses/        # Course Catalog, Details, Player, Certificate
│   │   ├── dashboard/      # Student Command Center & Radar Analytics
│   │   ├── login/          # Authentication Login
│   │   ├── practice/       # Mock Test Configuration, Arena & Results
│   │   ├── register/       # User Registration
│   │   ├── subjects/       # Study Materials, Cheat Sheets & Roadmaps
│   │   ├── payment/        # Checkout & Payment Success
│   │   ├── globals.css     # Modern Tailwind CSS styling & mesh gradients
│   │   └── layout.tsx      # Root Layout with Navbar, Chatbot & Providers
│   ├── components/         # Reusable React components (Navbar, Chatbot, CourseCard, etc.)
│   ├── context/            # AuthContext & state management
│   ├── lib/                # Database connection, JWT auth, and seed data
│   ├── models/             # Mongoose TypeScript models (User, Course, Lesson, Question, etc.)
│   └── utils/              # Client API fetch helper
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```
