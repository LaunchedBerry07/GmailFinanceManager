# DataBerry - Gmail Finance Manager

A sophisticated Gmail Finance Manager application designed to serve as a centralized hub for automated extraction, categorization, and management of financial documents from Gmail accounts. Built for accounting technicians, administrative assistants, and low-code developers to streamline financial document workflow management.

## 🌟 Features

- **Email Management**: Automated processing and categorization of financial emails
- **Advanced Filtering**: Multi-conditional rules for complex email queries
- **Data Export**: CSV export functionality respecting all active filters
- **Gmail Sync**: Integration with Google Apps Script for automated email processing
- **Label Management**: Custom categorization system for organizing emails
- **Contact Management**: Centralized contact database for financial correspondents
- **Dashboard Analytics**: Real-time metrics and visualizations
- **Session Authentication**: Secure PostgreSQL-backed user sessions

## 🎨 Design

DataBerry features a modern dark gradient theme with purple/magenta brand colors, designed for professional financial workflows with an intuitive user interface.

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Session-based with PostgreSQL storage
- **State Management**: TanStack Query

## 📋 Prerequisites

Before deploying to Render, ensure you have:

- Node.js 18+ installed locally
- PostgreSQL database (Render provides this)
- Google Apps Script setup for Gmail integration (optional)

## 🚀 Render Deployment Instructions

### Step 1: Prepare Your Repository

1. Ensure your code is pushed to a Git repository (GitHub, GitLab, etc.)
2. Verify all dependencies are listed in `package.json`
3. Confirm the build scripts are configured correctly

### Step 2: Create PostgreSQL Database on Render

1. Log into your [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure your database:
   - **Name**: `databerry-database`
   - **Database**: `databerry_db`
   - **User**: `databerry_user`
   - **Region**: Choose closest to your users
   - **Plan**: Start with Free tier for testing
4. Click **"Create Database"**
5. Save the connection details (Internal Database URL will be used)

### Step 3: Deploy Web Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your Git repository
3. Configure the service:

#### Basic Settings
- **Name**: `databerry-finance-manager`
- **Region**: Same as your database
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave blank (unless app is in subdirectory)

#### Build & Deploy Settings
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

#### Environment Variables
Add these environment variables in the Render dashboard:

```bash
NODE_ENV=production
DATABASE_URL=<YOUR_RENDER_POSTGRES_INTERNAL_URL>
SESSION_SECRET=<GENERATE_RANDOM_SECRET_STRING>
PORT=5000
GOOGLE_APPS_SCRIPT_URL=<YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL>
CORS_ORIGIN=<YOUR_FRONTEND_URL>