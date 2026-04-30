# LearnWithSky - Full-Stack E-Learning Platform

A premium, scalable e-learning platform built with Next.js, Express, and MongoDB.

## 🚀 How to Run the Project

### 1. Prerequisites
- **Node.js** installed.
- **MongoDB** running locally OR a **MongoDB Atlas** connection string.

### 2. Backend Setup (`/server`)
1.  **Configure Environment:** Open `server/.env` and ensure your `MONGO_URI` is correct.
2.  **Seed Data:** (Only once)
    ```bash
    npm.cmd run seed
    ```
3.  **Start Server:**
    ```bash
    npm.cmd run dev
    ```

### 3. Frontend Setup (`/client`)
1.  **Start Client:**
    ```bash
    npm.cmd run dev
    ```

## 🌐 Accessing the App
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

## 🔑 Sample Credentials
- **Admin/Instructor:** `admin@learnwithsky.com` / `password123`

## ✨ Features
- JWT Authentication
- Course Discovery & Search
- Video Player with Curriculum
- Student Dashboard
- Admin Console
- Responsive Design
