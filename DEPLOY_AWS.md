# Deploying LearnWithSky to AWS

Since this is a full-stack application (Next.js + Express + MongoDB), the deployment is best handled in three parts:

## 1. Database: MongoDB Atlas (Cloud)
AWS Amplify does not host MongoDB. You should use a managed service:
1.  Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a Cluster and get your **Connection String**.
3.  Whitelist `0.0.0.0/0` (or the specific AWS IP ranges) in the Network Access tab.

---

## 2. Backend: AWS App Runner (or Elastic Beanstalk)
To deploy the Node.js Express server:
1.  **Push your `server/` folder to GitHub.**
2.  In the AWS Console, go to **AWS App Runner**.
3.  Select "Source code repository" and connect your GitHub.
4.  Set the **Build command**: `npm install`
5.  Set the **Start command**: `npm start`
6.  **Add Environment Variables**:
    - `MONGO_URI`: Your MongoDB Atlas string.
    - `JWT_SECRET`: A secure random string.
    - `PORT`: `5000`
7.  Once deployed, copy the **Service URL** (e.g., `https://random-id.aws-region.awsapprunner.com`).

---

## 3. Frontend: AWS Amplify
To deploy the Next.js frontend:
1.  **Push your `client/` folder to GitHub.**
2.  In the AWS Console, go to **AWS Amplify**.
3.  Click "New App" > "Host web app" and connect your GitHub.
4.  Select the `client/` subdirectory.
5.  **Build Settings**: Amplify should automatically detect Next.js. Ensure the base directory is `client/.next`.
6.  **Add Environment Variable**:
    - `NEXT_PUBLIC_API_URL`: Paste the **Service URL** from your backend deployment.
7.  Deploy.

---

## 🏗️ Amplify Build Spec (`amplify.yml`)
If you need to customize the build, ensure your `amplify.yml` looks like this:

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    appRoot: client
```

## Summary
By following this approach, your frontend will be globally distributed via Amplify, and your backend will be automatically scaled by App Runner, both communicating securely through environment variables.
