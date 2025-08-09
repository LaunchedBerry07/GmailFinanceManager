import { 
  users, emails, labels, attachments, emailLabels,
  type User, type InsertUser, type Email, type InsertEmail,
  type Label, type InsertLabel, type EmailWithLabels, type DashboardMetrics,
  type Attachment, type InsertAttachment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, sql, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Email operations
  getEmails(limit?: number, offset?: number, search?: string, category?: string, dateFrom?: Date, dateTo?: Date): Promise<EmailWithLabels[]>;
  getEmailById(id: string): Promise<EmailWithLabels | undefined>;
  createEmail(email: InsertEmail): Promise<Email>;
  updateEmail(id: string, email: Partial<InsertEmail>): Promise<Email>;
  deleteEmail(id: string): Promise<void>;
  
  // Label operations
  getLabels(): Promise<Label[]>;
  createLabel(label: InsertLabel): Promise<Label>;
  updateLabel(id: number, label: Partial<InsertLabel>): Promise<Label>;
  deleteLabel(id: number): Promise<void>;
  
  // Attachment operations
  createAttachment(attachment: InsertAttachment): Promise<Attachment>;
  getEmailAttachments(emailId: string): Promise<Attachment[]>;
  
  // Dashboard metrics
  getDashboardMetrics(): Promise<DashboardMetrics>;
  
  // Export operations
  exportEmailToPdf(emailId: string): Promise<{ fileId: string; fileUrl: string }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getEmails(
    limit = 50,
    offset = 0,
    search?: string,
    category?: string,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<EmailWithLabels[]> {
    let baseQuery = db
      .select({
        id: emails.id,
        subject: emails.subject,
        snippet: emails.snippet,
        senderName: emails.senderName,
        senderEmail: emails.senderEmail,
        amount: emails.amount,
        category: emails.category,
        status: emails.status,
        driveFileId: emails.driveFileId,
        driveFileUrl: emails.driveFileUrl,
        receivedAt: emails.receivedAt,
        createdAt: emails.createdAt,
        updatedAt: emails.updatedAt,
      })
      .from(emails)
      .orderBy(desc(emails.receivedAt))
      .limit(limit)
      .offset(offset);

    const conditions = [];
    
    if (search) {
      conditions.push(
        ilike(emails.subject, `%${search}%`)
      );
    }
    
    if (category && category !== "All Categories") {
      conditions.push(eq(emails.category, category));
    }
    
    if (dateFrom) {
      conditions.push(gte(emails.receivedAt, dateFrom));
    }
    
    if (dateTo) {
      conditions.push(lte(emails.receivedAt, dateTo));
    }
    
    let query = baseQuery;
    if (conditions.length > 0) {
      query = baseQuery.where(and(...conditions));
    }

    const emailResults = await query;
    
    // Get labels and attachments for each email
    const emailsWithLabels: EmailWithLabels[] = [];
    
    for (const email of emailResults) {
      const emailLabelsResult = await db
        .select({
          id: labels.id,
          name: labels.name,
          color: labels.color,
          description: labels.description,
          createdAt: labels.createdAt,
        })
        .from(labels)
        .innerJoin(emailLabels, eq(emailLabels.labelId, labels.id))
        .where(eq(emailLabels.emailId, email.id));
      
      const attachmentsResult = await db
        .select()
        .from(attachments)
        .where(eq(attachments.emailId, email.id));
      
      emailsWithLabels.push({
        ...email,
        labels: emailLabelsResult,
        attachments: attachmentsResult,
      });
    }
    
    return emailsWithLabels;
  }

  async getEmailById(id: string): Promise<EmailWithLabels | undefined> {
    const [email] = await db.select().from(emails).where(eq(emails.id, id));
    if (!email) return undefined;

    const emailLabelsResult = await db
      .select({
        id: labels.id,
        name: labels.name,
        color: labels.color,
        description: labels.description,
        createdAt: labels.createdAt,
      })
      .from(labels)
      .innerJoin(emailLabels, eq(emailLabels.labelId, labels.id))
      .where(eq(emailLabels.emailId, email.id));
    
    const attachmentsResult = await db
      .select()
      .from(attachments)
      .where(eq(attachments.emailId, email.id));

    return {
      ...email,
      labels: emailLabelsResult,
      attachments: attachmentsResult,
    };
  }

  async createEmail(insertEmail: InsertEmail): Promise<Email> {
    const [email] = await db
      .insert(emails)
      .values(insertEmail)
      .returning();
    return email;
  }

  async updateEmail(id: string, updateData: Partial<InsertEmail>): Promise<Email> {
    const [email] = await db
      .update(emails)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(emails.id, id))
      .returning();
    return email;
  }

  async deleteEmail(id: string): Promise<void> {
    await db.delete(emails).where(eq(emails.id, id));
  }

  async getLabels(): Promise<Label[]> {
    return await db.select().from(labels).orderBy(labels.name);
  }

  async createLabel(insertLabel: InsertLabel): Promise<Label> {
    const [label] = await db
      .insert(labels)
      .values(insertLabel)
      .returning();
    return label;
  }

  async updateLabel(id: number, updateData: Partial<InsertLabel>): Promise<Label> {
    const [label] = await db
      .update(labels)
      .set(updateData)
      .where(eq(labels.id, id))
      .returning();
    return label;
  }

  async deleteLabel(id: number): Promise<void> {
    await db.delete(labels).where(eq(labels.id, id));
  }

  async createAttachment(insertAttachment: InsertAttachment): Promise<Attachment> {
    const [attachment] = await db
      .insert(attachments)
      .values(insertAttachment)
      .returning();
    return attachment;
  }

  async getEmailAttachments(emailId: string): Promise<Attachment[]> {
    return await db
      .select()
      .from(attachments)
      .where(eq(attachments.emailId, emailId));
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const totalEmailsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(emails);
    
    const uncategorizedEmailsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(emails)
      .where(eq(emails.category, "Uncategorized"));
    
    const totalDocumentsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(attachments);
    
    const monthlyExpensesResult = await db
      .select({ sum: sql<string>`coalesce(sum(amount::numeric), 0)` })
      .from(emails)
      .where(
        and(
          gte(emails.receivedAt, new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
          lte(emails.receivedAt, new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
        )
      );

    return {
      totalEmails: totalEmailsResult[0]?.count || 0,
      uncategorizedEmails: uncategorizedEmailsResult[0]?.count || 0,
      totalDocuments: totalDocumentsResult[0]?.count || 0,
      monthlyExpenses: parseFloat(monthlyExpensesResult[0]?.sum || "0"),
    };
  }

  async exportEmailToPdf(emailId: string): Promise<{ fileId: string; fileUrl: string }> {
    // This would integrate with Google Apps Script to convert email to PDF
    // For now, return mock data - in production this would call Google Drive API
    const mockFileId = `pdf_${emailId}_${Date.now()}`;
    const mockFileUrl = `https://drive.google.com/file/d/${mockFileId}/view`;
    
    // Update email with drive file info
    await this.updateEmail(emailId, {
      status: "exported",
      driveFileId: mockFileId,
      driveFileUrl: mockFileUrl,
    });
    
    return {
      fileId: mockFileId,
      fileUrl: mockFileUrl,
    };
  }
}

export const storage = new DatabaseStorage();
