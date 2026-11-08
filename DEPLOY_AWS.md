# Deploying LearnWithSky Next.js Full-Stack App to AWS / Vercel

Since LearnWithSky is now a unified Next.js Full-Stack application (frontend + API route handlers + MongoDB), deployment is streamlined.

---

## 1. Database: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster and obtain your **Connection String**.
3. In Network Access, allow access from anywhere (`0.0.0.0/0`) or whitelist your hosting IP.

---

## 2. Deploying on AWS Amplify Hosting
1. Push your repository to GitHub.
2. Go to the **AWS Amplify Console** > **Host web app**.
3. Connect your GitHub repository.
4. Amplify will automatically detect **Next.js - SSR**.
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random secret string.
   - `STRIPE_SECRET_KEY`: Your Stripe secret key or `sk_test_placeholder`.
   - `NEXT_PUBLIC_API_URL`: `/api`
6. Click **Save and Deploy**.

---

## 3. Alternative: Deploying to Vercel (One-Click)
1. Push your code to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set Environment Variables: `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`.
4. Deploy! Next.js App Router and API Route Handlers run with serverless compute automatically.
