Attention Replit AI Agent:

This directive outlines the strategic implementation of a sophisticated Gmail Finance Manager application, codenamed "DataBerry". Your primary objective is to develop and deploy this application within the Replit environment, adhering to the architectural and functional specifications detailed below. This initiative is designed to empower a multi-faceted professional who operates as an Accounting Technician, Administrative Assistant, Language Practitioner, and Low-Code Developer.

I. High-Level Strategic Overview

The "DataBerry" platform will serve as a centralized hub for the automated extraction, categorization, and management of financial documents from a user's Gmail account. The overarching goal is to streamline financial workflows, enhance data visibility, and drive operational efficiency.

II. Architectural Blueprint

The application will be built upon a strategically distributed architecture to leverage the optimal platform for each component:

- Front-End & Back-End Application Logic: To be hosted on the Render platform.
- Database: A Google Cloud SQL for PostgreSQL instance will serve as the primary data store.
- Data Processing (ETL): All email processing, including data extraction and metadata enrichment, will be handled by a Google Apps Script. Your role is to build the application that will interface with the data processed by this script, not to replicate the script's functionality.

III. Core Functionality & Feature Set

You are tasked with building the user-facing application with the following core features:

- Dashboard & Data Visualization:

- A main dashboard to provide a high-level overview of key financial metrics.
- Simple, clean charts and graphs to visualize financial trends.

- Data Management & Operations:

- A table-based view of all processed financial documents (receipts, bills, invoices, etc.).
- Advanced filtering and sorting capabilities by date, sender, label, and category.
- The ability to manually add, edit, and delete financial records.

- User & Label Management:

- A simple interface for managing user access.
- A system for creating, editing, and deleting custom labels to categorize financial documents.

- Data Export:

- Functionality to export filtered data to a CSV file.

IV. User-Centric Design Considerations

The application must be designed with the following user personas in mind:

- As an Accounting Technician: I need to be able to quickly access, filter, and export financial data for accounting and tax purposes. The application should provide a clear and accurate view of all financial transactions.
- As an Administrative Assistant: I need to be able to easily manage and organize financial documents, track expenses, and generate reports for administrative tasks.
- As a Language Practitioner: I may need to process invoices and financial documents in multiple languages. The application should be designed with i18n (internationalization) in mind for future enhancements.
- As a Low-Code Developer: I will be maintaining and extending the application. The code should be well-structured, commented, and easy to understand.

V. "Checkpoint-Aware" Development Protocol

To ensure this project remains within the scope of the Replit Starter Plan, you must adhere to the following "checkpoint-aware" development protocol:

1. Phased Implementation: We will approach this project in a phased manner. I will provide you with specific instructions for each phase. Do not proceed to the next phase until I give you the explicit command to do so.
2. Explicit Confirmation: Before you generate any code that will result in a "checkpoint," you must first present me with a clear and concise plan of action. This plan should detail the files you will create or modify and the changes you intend to make. I will then approve this plan before you proceed.
3. Minimal Viable Product (MVP) Focus: Our initial focus will be on building a core, functional MVP. We will prioritize the most critical features first and iterate on them. Avoid adding any "bells and whistles" that are not explicitly requested.
4. One Feature at a Time: We will build one feature at a time. For example, we will first focus on setting up the basic application structure, then move on to the database connection, then the dashboard, and so on.

VI. Initial Task

Your first task is to create the basic file structure for a new Next.js application with TypeScript. Do not install any dependencies or generate any code beyond the initial file structure. Present me with the proposed file structure before you create it.