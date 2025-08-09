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
```

**Important**: 
- Use the **Internal Database URL** from your PostgreSQL service
- Generate a strong random string for `SESSION_SECRET` (32+ characters)
- The `PORT` variable should match your application's port configuration

### Step 4: Configure package.json Scripts

Ensure your `package.json` includes these scripts:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "NODE_ENV=production tsx server/index.ts",
    "dev": "NODE_ENV=development tsx server/index.ts",
    "db:push": "drizzle-kit push:pg"
  }
}
```

### Step 5: Database Migration

After successful deployment:

1. Open your Render service shell (available in service dashboard)
2. Run database migration:
   ```bash
   npm run db:push
   ```

Alternatively, set up automatic migrations in your application startup code.

### Step 6: Custom Domain (Optional)

1. In your Render service settings, go to **"Custom Domains"**
2. Add your domain name
3. Configure DNS records as instructed by Render
4. Enable SSL (automatic with Render)

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Secret for session encryption | `your-super-secret-key-here` |
| `PORT` | Application port | `5000` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_APPS_SCRIPT_URL` | Webhook URL for Gmail sync | `null` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |

## 📊 Google Apps Script Integration

To enable Gmail synchronization:

1. Create a Google Apps Script project
2. Set up Gmail API permissions
3. Configure webhook endpoint to point to your Render service
4. Add the Apps Script URL to your environment variables

## 🔒 Security Considerations

- **Session Security**: Uses secure HTTP-only cookies in production
- **Database**: All queries use parameterized statements via Drizzle ORM
- **CORS**: Configure appropriate origins for your domain
- **Environment Variables**: Never commit sensitive data to repository

## 📈 Monitoring & Logs

Render provides built-in monitoring:

- **Logs**: Available in service dashboard
- **Metrics**: CPU, memory, and request monitoring
- **Health Checks**: Automatic endpoint monitoring
- **Alerts**: Configure notifications for service issues

## 🛠 Development Setup

For local development:

```bash
# Clone repository
git clone <your-repository-url>
cd databerry-finance-manager

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your local database credentials

# Start development server
npm run dev
```

## 📝 API Endpoints

Key API endpoints available:

- `POST /api/auth/login` - User authentication
- `GET /api/emails` - Retrieve filtered emails
- `GET /api/emails/export` - Export emails as CSV
- `POST /api/sync` - Trigger Gmail synchronization
- `GET /api/dashboard/metrics` - Dashboard analytics

## 🤝 Support

For deployment issues:

1. Check Render service logs for error details
2. Verify environment variables are set correctly
3. Ensure database connection is successful
4. Review build logs for dependency issues

## 📄 License

This project is proprietary software for DataBerry Finance Management.

---

**Built with ❤️ for modern financial workflow management**