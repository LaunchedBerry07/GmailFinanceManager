# DataBerry - Gmail Finance Manager

## Overview

DataBerry is a sophisticated Gmail Finance Manager application designed to serve as a centralized hub for automated extraction, categorization, and management of financial documents from Gmail accounts. The system provides a modern web interface for processing financial emails, receipts, bills, and invoices with advanced filtering, data visualization, and Google Drive PDF export capabilities. Built with a focus on accounting technicians, administrative assistants, and low-code developers, the platform streamlines financial document workflow management.

## Recent Implementation Status (2025-01-09)

Successfully migrated and enhanced the DataBerry Gmail Finance Manager:
- ✅ Implemented session-based authentication with PostgreSQL storage
- ✅ Enhanced color scheme to match exact brand palette (purple/magenta gradients)
- ✅ Added advanced filtering system with multi-conditional rules
- ✅ Implemented CSV export functionality with filter respect
- ✅ Added Gmail sync functionality (ready for Google Apps Script integration)
- ✅ Fixed TypeScript compilation errors
- ✅ Added proper test IDs for UI elements
- ✅ Enhanced dashboard with functional sync and export buttons
- ✅ Created comprehensive README with Render deployment instructions

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with a custom dark gradient theme and shadcn/ui component library
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for client-side routing
- **UI Components**: Comprehensive shadcn/ui implementation with Radix UI primitives
- **Design System**: Custom "DataBerry" branding with purple/gradient color scheme

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for CRUD operations on emails, labels, and attachments
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple

### Database Schema
- **Primary Database**: PostgreSQL with Neon serverless connection
- **Core Tables**:
  - `users`: User authentication and management
  - `emails`: Financial email data with metadata (subject, sender, amount, category)
  - `labels`: Custom categorization system
  - `attachments`: File attachments with base64 content storage
  - `emailLabels`: Many-to-many relationship between emails and labels
- **Key Features**: UUID primary keys, timestamp tracking, soft delete support

### Authentication & Authorization
- **Strategy**: Session-based authentication with PostgreSQL storage
- **User Management**: Username/email registration with password-based login
- **Security**: Environment variable configuration for database credentials

### Data Processing Pipeline
- **ETL Strategy**: External Google Apps Script handles email processing and extraction
- **Integration Points**: API endpoints receive processed data from Google Apps Script
- **File Handling**: Base64 encoded attachment storage with mime type detection
- **Metadata Enrichment**: Automated categorization and amount extraction

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Connection Management**: WebSocket-based connections for serverless compatibility

### Google Workspace Integration
- **Google Apps Script**: External service for Gmail API interaction and email processing
- **Google Drive API**: PDF conversion and cloud storage integration via Apps Script
- **Gmail API**: Email fetching and attachment processing through Apps Script webhook

### Third-Party Libraries
- **UI Framework**: shadcn/ui with Radix UI primitives for accessible components
- **Form Handling**: React Hook Form with Zod validation schemas
- **Data Fetching**: TanStack Query for server state management
- **Date Processing**: date-fns for date manipulation and formatting
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build System**: Vite with ESBuild for fast development and production builds
- **TypeScript**: Full type safety across frontend and backend with shared schema types
- **Styling**: PostCSS with Tailwind CSS and autoprefixer
- **Development Environment**: Replit-specific plugins and error handling for cloud development

### Deployment Architecture
- **Target Platform**: Render for application hosting
- **Database Hosting**: Google Cloud SQL for PostgreSQL (production) / Neon (development)
- **Static Assets**: Served through Vite build system with Express static middleware
- **Environment Configuration**: Environment variables for database URLs and Google Apps Script endpoints