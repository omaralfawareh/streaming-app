# Live Stream Broadcasting App

A live streaming application built with Next.js and AWS IVS (Interactive Video Service) that enables users to broadcast live streams with low latency on the web through RTMPS.

## 🚀 Features

- **Low Latency Streaming**: Stream with under 5 seconds latency using AWS IVS
- **Secure Authentication**: User management with Clerk authentication
- **Real-time Broadcasting**: RTMPS protocol for secure stream ingestion
- **Adaptive Bitrate**: Automatically adjusts video quality based on viewer's network conditions

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, Shadcn UI components
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Video Player**: Video.js
- **Broadcasting**: Amazon IVS Web Broadcast SDK

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS account with IVS service access
- Clerk account for authentication

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/streaming_app"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
SIGNING_SECRET=whsec_...

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/omaralfawareh/streaming-app

   cd streaming-app
   ```

2. **Install dependencies**

   ```bash
   # Install pnpm globally (if not already installed)
   npm install -g pnpm

   pnpm install
   ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push
   ```

4. **Configure AWS IVS**

   - Create an AWS account
   - Set up IAM user with IVS permissions
   - Add AWS credentials to your environment variables

5. **Configure Clerk Authentication**

   - Create a Clerk account at [clerk.com](https://clerk.com)
   - Create a new application
   - Add the API keys to your environment variables
   - Configure webhooks for user management

6. **Run the development server**

   ```bash
   pnpm dev
   ```

7. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### For Streamers

1. **Sign up/Sign in** using the authentication system
   your credential
2. **Start streaming** to your audience

### For Viewers

1. **Watch live streams** with low latency
2. **Enjoy adaptive quality** based on your connection
3. **Browse available streams** on the platform (Coming Soon)
