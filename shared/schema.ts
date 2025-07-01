import { pgTable, text, serial, integer, boolean, timestamp, real, decimal, varchar, json, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'patient', 'medecin', 'admin'
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  systolic: integer("systolic").notNull(),
  diastolic: integer("diastolic").notNull(),
  pulse: integer("pulse").notNull(),
  context: text("context"), // 'repos', 'apres_repas', 'activite', 'stress', etc.
  comment: text("comment"),
  measuredAt: timestamp("measured_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const glucoseMeasurements = pgTable("glucose_measurements", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  fastingGlucose: integer("fasting_glucose"), // mg/dL
  randomGlucose: integer("random_glucose"), // mg/dL
  hgpo2h: integer("hgpo_2h"), // HGPO 2h - mg/dL
  hba1c: real("hba1c"), // %
  measurementType: text("measurement_type").notNull(), // "fasting", "random", "hgpo", "hba1c"
  context: text("context"), // "jeun", "postprandial", "aleatoire", "controle"
  comment: text("comment"),
  measuredAt: timestamp("measured_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  status: text("status").notNull(), // 'active', 'expired', 'trial', 'grace_period'
  plan: text("plan").notNull(), // 'monthly', 'yearly'
  amount: integer("amount").notNull(), // in FCFA
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  paymentMethod: text("payment_method"), // 'orange_money', 'mtn_money', 'moov_money'
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id).notNull(),
  amount: integer("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  transactionId: text("transaction_id"),
  status: text("status").notNull(), // 'pending', 'completed', 'failed'
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // 'measurement_reminder', 'payment_due', 'doctor_message', etc.
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const medications = pgTable("medications", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull(),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  instructions: text("instructions"),
  prescribedBy: text("prescribed_by"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").notNull().default(true),
  reminderEnabled: boolean("reminder_enabled").notNull().default(true),
  reminderTimes: text("reminder_times").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull().default("text"),
  isRead: boolean("is_read").notNull().default(false),
  priority: text("priority").notNull().default("normal"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  doctorId: integer("doctor_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // 'teleconsultation', 'consultation', 'urgence'
  status: text("status").notNull(), // 'scheduled', 'in_progress', 'completed', 'cancelled'
  platform: text("platform"), // 'tensiocare', 'diabetocare'
  scheduledDate: timestamp("scheduled_date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  reason: text("reason").notNull(),
  notes: text("notes"),
  prescription: text("prescription"),
  measurements: text("measurements"), // JSON string for measurements taken during consultation
  videoLink: text("video_link"), // for teleconsultations
  rating: integer("rating"), // 1-5 patient rating
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertMedicationSchema = createInsertSchema(medications).omit({
  id: true,
  createdAt: true,
});

export const insertGlucoseMeasurementSchema = createInsertSchema(glucoseMeasurements).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Nom d'utilisateur requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Measurement = typeof measurements.$inferSelect;
export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Medication = typeof medications.$inferSelect;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;
export type GlucoseMeasurement = typeof glucoseMeasurements.$inferSelect;
export type InsertGlucoseMeasurement = z.infer<typeof insertGlucoseMeasurementSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;

// Enhanced Consultations App Schema
export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  defaultDuration: integer("default_duration").default(30), // minutes
  questionnaire: json("questionnaire"), // specialty-specific questions
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const establishments = pgTable("establishments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // clinic, hospital, health_center
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
  website: varchar("website", { length: 200 }),
  operatingHours: json("operating_hours"),
  services: json("services"), // array of services
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const doctorEstablishments = pgTable("doctor_establishments", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id").notNull(),
  establishmentId: integer("establishment_id").notNull(),
  consultationDays: json("consultation_days"), // [1,2,3,4,5] for Mon-Fri
  startTime: varchar("start_time", { length: 10 }), // "09:00"
  endTime: varchar("end_time", { length: 10 }), // "17:00"
  lunchBreakStart: varchar("lunch_break_start", { length: 10 }),
  lunchBreakEnd: varchar("lunch_break_end", { length: 10 }),
  consultationDuration: integer("consultation_duration").default(30),
  hourlyRate: integer("hourly_rate"), // in CFA francs
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const doctorAvailability = pgTable("doctor_availability", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id").notNull(),
  date: date("date").notNull(),
  startTime: varchar("start_time", { length: 10 }).notNull(),
  endTime: varchar("end_time", { length: 10 }).notNull(),
  isBlocked: boolean("is_blocked").default(false),
  reason: varchar("reason", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const consultationProfiles = pgTable("consultation_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  // Common fields
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 1 }), // M/F
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  // Patient-specific fields
  bloodGroup: varchar("blood_group", { length: 5 }),
  allergies: json("allergies"), // array of allergies
  chronicDiseases: json("chronic_diseases"), // array of diseases
  currentTreatments: json("current_treatments"), // array of treatments
  emergencyContactName: varchar("emergency_contact_name", { length: 100 }),
  emergencyContactPhone: varchar("emergency_contact_phone", { length: 20 }),
  emergencyContactRelation: varchar("emergency_contact_relation", { length: 50 }),
  // Doctor-specific fields
  specialties: json("specialties"), // array of specialties
  secondarySpecialties: json("secondary_specialties"),
  medicalLicense: varchar("medical_license", { length: 50 }),
  yearsExperience: integer("years_experience"),
  languages: json("languages"), // array of languages
  bio: text("bio"),
  profilePictureUrl: varchar("profile_picture_url", { length: 500 }),
  averageRating: real("average_rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  isVerified: boolean("is_verified").default(false),
  verificationDocuments: json("verification_documents"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for new tables
export const insertSpecialtySchema = createInsertSchema(specialties);
export const insertEstablishmentSchema = createInsertSchema(establishments);
export const insertDoctorEstablishmentSchema = createInsertSchema(doctorEstablishments);
export const insertDoctorAvailabilitySchema = createInsertSchema(doctorAvailability);
export const insertConsultationProfileSchema = createInsertSchema(consultationProfiles);

// Types for new tables
export type Specialty = typeof specialties.$inferSelect;
export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type Establishment = typeof establishments.$inferSelect;
export type InsertEstablishment = z.infer<typeof insertEstablishmentSchema>;
export type DoctorEstablishment = typeof doctorEstablishments.$inferSelect;
export type InsertDoctorEstablishment = z.infer<typeof insertDoctorEstablishmentSchema>;
export type DoctorAvailability = typeof doctorAvailability.$inferSelect;
export type InsertDoctorAvailability = z.infer<typeof insertDoctorAvailabilitySchema>;
export type ConsultationProfile = typeof consultationProfiles.$inferSelect;
export type InsertConsultationProfile = z.infer<typeof insertConsultationProfileSchema>;
