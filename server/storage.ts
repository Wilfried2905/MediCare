import { 
  users, measurements, glucoseMeasurements, subscriptions, payments, notifications, medications, messages, consultations,
  specialties, establishments, doctorEstablishments, doctorAvailability, consultationProfiles,
  type User, type InsertUser, type Measurement, type InsertMeasurement,
  type GlucoseMeasurement, type InsertGlucoseMeasurement,
  type Subscription, type InsertSubscription, type Payment, type InsertPayment,
  type Notification, type InsertNotification, type Medication, type InsertMedication,
  type Message, type InsertMessage, type Consultation, type InsertConsultation,
  type Specialty, type InsertSpecialty, type Establishment, type InsertEstablishment,
  type DoctorEstablishment, type InsertDoctorEstablishment, 
  type DoctorAvailability, type InsertDoctorAvailability,
  type ConsultationProfile, type InsertConsultationProfile
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Measurements
  getMeasurements(patientId: number, limit?: number): Promise<Measurement[]>;
  getMeasurementsByDateRange(patientId: number, startDate: Date, endDate: Date): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
  deleteMeasurement(id: number): Promise<boolean>;
  
  // Subscriptions
  getSubscription(patientId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscriptionStatus(id: number, status: string): Promise<Subscription | undefined>;
  
  // Payments
  getPayments(subscriptionId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: number, status: string): Promise<Payment | undefined>;
  
  // Notifications
  getNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
  
  // Medications
  getMedications(patientId: number): Promise<Medication[]>;
  createMedication(medication: InsertMedication): Promise<Medication>;
  updateMedication(id: number, updates: Partial<Medication>): Promise<Medication | undefined>;
  deleteMedication(id: number): Promise<boolean>;
  
  // Messages
  getMessages(userId: number): Promise<Message[]>;
  getConversation(senderId: number, receiverId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<boolean>;
  
  // Glucose Measurements (DiabetoCare)
  getGlucoseMeasurements(patientId: number): Promise<GlucoseMeasurement[]>;
  createGlucoseMeasurement(measurement: InsertGlucoseMeasurement): Promise<GlucoseMeasurement>;
  deleteGlucoseMeasurement(id: number): Promise<boolean>;
  
  // Consultations
  getConsultations(filters?: { patientId?: number; doctorId?: number; platform?: string; status?: string }): Promise<Consultation[]>;
  getConsultation(id: number): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined>;
  deleteConsultation(id: number): Promise<boolean>;
  
  // Specialties (Consultations App)
  getSpecialties(): Promise<Specialty[]>;
  getSpecialty(id: number): Promise<Specialty | undefined>;
  createSpecialty(specialty: InsertSpecialty): Promise<Specialty>;
  updateSpecialty(id: number, updates: Partial<Specialty>): Promise<Specialty | undefined>;
  
  // Establishments (Consultations App)
  getEstablishments(): Promise<Establishment[]>;
  getEstablishment(id: number): Promise<Establishment | undefined>;
  createEstablishment(establishment: InsertEstablishment): Promise<Establishment>;
  updateEstablishment(id: number, updates: Partial<Establishment>): Promise<Establishment | undefined>;
  
  // Doctor Establishments (Consultations App)
  getDoctorEstablishments(doctorId: number): Promise<DoctorEstablishment[]>;
  createDoctorEstablishment(doctorEstablishment: InsertDoctorEstablishment): Promise<DoctorEstablishment>;
  updateDoctorEstablishment(id: number, updates: Partial<DoctorEstablishment>): Promise<DoctorEstablishment | undefined>;
  
  // Doctor Availability (Consultations App)
  getDoctorAvailability(doctorId: number, date?: string): Promise<DoctorAvailability[]>;
  createDoctorAvailability(availability: InsertDoctorAvailability): Promise<DoctorAvailability>;
  blockDoctorSlot(doctorId: number, date: string, startTime: string, endTime: string, reason?: string): Promise<DoctorAvailability>;
  
  // Consultation Profiles (Consultations App)
  getConsultationProfile(userId: number): Promise<ConsultationProfile | undefined>;
  createConsultationProfile(profile: InsertConsultationProfile): Promise<ConsultationProfile>;
  updateConsultationProfile(userId: number, updates: Partial<ConsultationProfile>): Promise<ConsultationProfile | undefined>;
  
  // Search and Filtering (Consultations App)
  searchDoctors(filters: { 
    specialty?: string; 
    city?: string; 
    availability?: string;
    rating?: number;
  }): Promise<ConsultationProfile[]>;
  
  getAvailableSlots(doctorId: number, date: string): Promise<{ time: string; available: boolean }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private measurements: Map<number, Measurement>;
  private glucoseMeasurements: Map<number, GlucoseMeasurement>;
  private subscriptions: Map<number, Subscription>;
  private payments: Map<number, Payment>;
  private notifications: Map<number, Notification>;
  private medications: Map<number, Medication>;
  private messages: Map<number, Message>;
  private consultations: Map<number, Consultation>;
  // Consultations App entities
  private specialties: Map<number, Specialty>;
  private establishments: Map<number, Establishment>;
  private doctorEstablishments: Map<number, DoctorEstablishment>;
  private doctorAvailability: Map<number, DoctorAvailability>;
  private consultationProfiles: Map<number, ConsultationProfile>;
  
  private currentUserId: number;
  private currentMeasurementId: number;
  private currentGlucoseMeasurementId: number;
  private currentSubscriptionId: number;
  private currentPaymentId: number;
  private currentNotificationId: number;
  private currentMedicationId: number;
  private currentMessageId: number;
  private currentConsultationId: number;
  // Consultations App counters
  private currentSpecialtyId: number;
  private currentEstablishmentId: number;
  private currentDoctorEstablishmentId: number;
  private currentDoctorAvailabilityId: number;
  private currentConsultationProfileId: number;

  constructor() {
    this.users = new Map();
    this.measurements = new Map();
    this.glucoseMeasurements = new Map();
    this.subscriptions = new Map();
    this.payments = new Map();
    this.notifications = new Map();
    this.medications = new Map();
    this.messages = new Map();
    this.consultations = new Map();
    this.currentUserId = 1;
    this.currentMeasurementId = 1;
    this.currentGlucoseMeasurementId = 1;
    this.currentSubscriptionId = 1;
    this.currentPaymentId = 1;
    this.currentNotificationId = 1;
    this.currentMedicationId = 1;
    this.currentMessageId = 1;
    this.currentConsultationId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create demo users
    const patient: User = {
      id: this.currentUserId++,
      username: "patient",
      password: "patient",
      role: "patient",
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie.dupont@email.com",
      phone: "+22555123456",
      createdAt: new Date(),
    };
    this.users.set(patient.id, patient);

    const medecin: User = {
      id: this.currentUserId++,
      username: "medecin",
      password: "medecin",
      role: "medecin",
      firstName: "Dr. Jean",
      lastName: "Martin",
      email: "dr.martin@clinic.com",
      phone: "+22555654321",
      createdAt: new Date(),
    };
    this.users.set(medecin.id, medecin);

    const admin: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin",
      role: "admin",
      firstName: "Admin",
      lastName: "System",
      email: "admin@tensiocare.com",
      phone: "+22555999888",
      createdAt: new Date(),
    };
    this.users.set(admin.id, admin);

    // Utilisateurs DiabetoCare
    const patientDiabete: User = {
      id: this.currentUserId++,
      username: "patient-diabete",
      password: "patient",
      role: "patient",
      firstName: "Marie",
      lastName: "Diabétique",
      email: "marie.diabete@diabetocare.com",
      phone: "+22555123457",
      createdAt: new Date(),
    };
    this.users.set(patientDiabete.id, patientDiabete);

    const diabetologue: User = {
      id: this.currentUserId++,
      username: "diabetologue",
      password: "diabetologue",
      role: "medecin",
      firstName: "Dr. Pierre",
      lastName: "Glycémie",
      email: "dr.glycemie@diabetocare.com",
      phone: "+22555123458",
      createdAt: new Date(),
    };
    this.users.set(diabetologue.id, diabetologue);

    // Create subscription for patient (expires in 2 days for testing alert)
    const nearExpiryDate = new Date();
    nearExpiryDate.setDate(nearExpiryDate.getDate() + 2);
    
    const subscription: Subscription = {
      id: this.currentSubscriptionId++,
      patientId: patient.id,
      status: "active",
      plan: "monthly",
      amount: 5000,
      startDate: new Date("2024-02-15"),
      endDate: nearExpiryDate,
      paymentMethod: "orange_money",
      createdAt: new Date(),
    };
    this.subscriptions.set(subscription.id, subscription);

    // Create sample measurements for patient
    const measurementDates = [
      new Date("2024-02-16T14:30:00"),
      new Date("2024-02-15T09:15:00"),
      new Date("2024-02-14T19:00:00"),
      new Date("2024-02-13T08:30:00"),
      new Date("2024-02-12T20:15:00"),
    ];

    const measurementData = [
      { systolic: 128, diastolic: 82, pulse: 72, context: "repos", comment: "Après repos" },
      { systolic: 142, diastolic: 88, pulse: 78, context: "stress", comment: "Stress au travail" },
      { systolic: 125, diastolic: 79, pulse: 68, context: "repos", comment: "Soirée calme" },
      { systolic: 135, diastolic: 85, pulse: 75, context: "apres_repas", comment: "Après déjeuner" },
      { systolic: 130, diastolic: 83, pulse: 70, context: "matin", comment: "Matin au réveil" },
    ];

    measurementData.forEach((data, index) => {
      const measurement: Measurement = {
        id: this.currentMeasurementId++,
        patientId: patient.id,
        systolic: data.systolic,
        diastolic: data.diastolic,
        pulse: data.pulse,
        context: data.context,
        comment: data.comment,
        measuredAt: measurementDates[index],
        createdAt: measurementDates[index],
      };
      this.measurements.set(measurement.id, measurement);
    });

    // Create sample glucose measurements for DiabetoCare
    const glucoseMeasurements = [
      { fastingGlucose: 95, randomGlucose: null, hgpo2h: null, hba1c: null, measurementType: "fasting", context: "jeun", comment: "Mesure à jeun matinale", measuredAt: new Date("2024-06-30T07:00:00") },
      { fastingGlucose: null, randomGlucose: 149, hgpo2h: null, hba1c: null, measurementType: "random", context: "postprandial", comment: "2h après dîner", measuredAt: new Date("2024-06-29T20:00:00") },
      { fastingGlucose: 105, randomGlucose: null, hgpo2h: null, hba1c: null, measurementType: "fasting", context: "avant_repas", comment: "Avant repas de midi", measuredAt: new Date("2024-06-29T12:00:00") },
      { fastingGlucose: null, randomGlucose: 180, hgpo2h: null, hba1c: null, measurementType: "random", context: "postprandial", comment: "Post-prandial élevé", measuredAt: new Date("2024-06-28T14:00:00") },
      { fastingGlucose: 88, randomGlucose: null, hgpo2h: null, hba1c: null, measurementType: "fasting", context: "jeun", comment: "Excellente mesure à jeun", measuredAt: new Date("2024-06-28T07:00:00") },
    ];

    glucoseMeasurements.forEach((data) => {
      const glucoseMeasurement: GlucoseMeasurement = {
        id: this.currentGlucoseMeasurementId++,
        patientId: patientDiabete.id,
        fastingGlucose: data.fastingGlucose,
        randomGlucose: data.randomGlucose,
        hgpo2h: data.hgpo2h,
        hba1c: data.hba1c,
        measurementType: data.measurementType,
        context: data.context,
        comment: data.comment,
        measuredAt: data.measuredAt,
        createdAt: data.measuredAt,
      };
      this.glucoseMeasurements.set(glucoseMeasurement.id, glucoseMeasurement);
    });

    // Create sample notifications
    const notifications = [
      {
        userId: patient.id,
        type: "doctor_message",
        title: "Message du Dr. Martin",
        message: "Vos mesures s'améliorent, continuez ainsi ! Pensez à réduire le sel.",
        isRead: false,
      },
      {
        userId: patient.id,
        type: "measurement_reminder",
        title: "Rappel de prise",
        message: "N'oubliez pas votre mesure de ce soir (vers 20h)",
        isRead: false,
      },
    ];

    notifications.forEach((notif) => {
      const notification: Notification = {
        id: this.currentNotificationId++,
        ...notif,
        createdAt: new Date(),
      };
      this.notifications.set(notification.id, notification);
    });

    // Create sample medications for patient
    const medications: Medication[] = [
      {
        id: this.currentMedicationId++,
        patientId: patient.id,
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "daily",
        instructions: "À prendre le matin, avec ou sans nourriture",
        prescribedBy: "Dr. Martin",
        startDate: new Date("2024-02-01"),
        endDate: null,
        isActive: true,
        reminderEnabled: true,
        reminderTimes: ["08:00"],
        createdAt: new Date(),
      },
      {
        id: this.currentMedicationId++,
        patientId: patient.id,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "daily",
        instructions: "À prendre le soir, éviter les aliments riches en potassium",
        prescribedBy: "Dr. Martin",
        startDate: new Date("2024-02-01"),
        endDate: null,
        isActive: true,
        reminderEnabled: true,
        reminderTimes: ["20:00"],
        createdAt: new Date(),
      }
    ];

    medications.forEach(med => this.medications.set(med.id, med));

    // Create sample messages
    const messages: Message[] = [
      {
        id: this.currentMessageId++,
        senderId: medecin.id,
        receiverId: patient.id,
        content: "Bonjour Marie, j'ai examiné vos dernières mesures de tension. Elles montrent une amélioration notable depuis le début du traitement.",
        type: "text",
        isRead: false,
        priority: "normal",
        createdAt: new Date("2024-02-16T10:30:00"),
      },
      {
        id: this.currentMessageId++,
        senderId: patient.id,
        receiverId: medecin.id,
        content: "Docteur, j'ai eu quelques étourdissements ce matin. Est-ce normal avec le nouveau dosage ?",
        type: "text",
        isRead: false,
        priority: "normal",
        createdAt: new Date("2024-02-16T08:45:00"),
      }
    ];

    messages.forEach(msg => this.messages.set(msg.id, msg));

    // Create sample consultations for TensioCare
    const tensioConsultations: Consultation[] = [
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: medecin.id,
        type: "teleconsultation",
        status: "scheduled",
        platform: "tensiocare",
        scheduledDate: new Date("2025-01-02T14:00:00"),
        duration: 30,
        reason: "Suivi hypertension - ajustement traitement",
        notes: null,
        prescription: null,
        measurements: JSON.stringify({ systolic: 135, diastolic: 85, pulse: 75 }),
        videoLink: "https://meet.tensiocare.com/room/abc123",
        rating: null,
        followUpDate: new Date("2025-01-16T14:00:00"),
        createdAt: new Date("2024-12-15T10:00:00"),
        updatedAt: new Date("2024-12-15T10:00:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: medecin.id,
        type: "consultation",
        status: "completed",
        platform: "tensiocare",
        scheduledDate: new Date("2024-12-20T10:30:00"),
        duration: 45,
        reason: "Consultation de suivi hypertension",
        notes: "Patient montre une bonne amélioration. Mesures dans la norme depuis 2 semaines. Continuer traitement actuel.",
        prescription: "Amlodipine 5mg - continuer. Lisinopril 10mg - augmenter à 15mg.",
        measurements: JSON.stringify({ systolic: 128, diastolic: 82, pulse: 72 }),
        videoLink: null,
        rating: 5,
        followUpDate: new Date("2025-01-20T10:30:00"),
        createdAt: new Date("2024-12-18T09:00:00"),
        updatedAt: new Date("2024-12-20T11:15:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: medecin.id,
        type: "urgence",
        status: "completed",
        platform: "tensiocare",
        scheduledDate: new Date("2024-12-10T16:30:00"),
        duration: 20,
        reason: "Tension élevée - mesure 165/102",
        notes: "Patient signale étourdissements et maux de tête. Tension très élevée. Ajustement immédiat du traitement nécessaire.",
        prescription: "Amlodipine - augmentation immédiate à 10mg. Repos recommandé.",
        measurements: JSON.stringify({ systolic: 165, diastolic: 102, pulse: 88 }),
        videoLink: "https://meet.tensiocare.com/room/emergency456",
        rating: 4,
        followUpDate: new Date("2024-12-12T09:00:00"),
        createdAt: new Date("2024-12-10T16:15:00"),
        updatedAt: new Date("2024-12-10T16:50:00"),
      }
    ];

    // Create sample consultations for DiabetoCare
    const diabetoConsultations: Consultation[] = [
      {
        id: this.currentConsultationId++,
        patientId: patientDiabete.id,
        doctorId: diabetologue.id,
        type: "teleconsultation",
        status: "scheduled",
        platform: "diabetocare",
        scheduledDate: new Date("2025-01-03T15:00:00"),
        duration: 30,
        reason: "Suivi diabète Type 2 - contrôle glycémique",
        notes: null,
        prescription: null,
        measurements: JSON.stringify({ fastingGlucose: 105, randomGlucose: null, hba1c: 7.2 }),
        videoLink: "https://meet.diabetocare.com/room/diabetes789",
        rating: null,
        followUpDate: new Date("2025-01-17T15:00:00"),
        createdAt: new Date("2024-12-16T11:00:00"),
        updatedAt: new Date("2024-12-16T11:00:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patientDiabete.id,
        doctorId: diabetologue.id,
        type: "consultation",
        status: "completed",
        platform: "diabetocare",
        scheduledDate: new Date("2024-12-22T14:30:00"),
        duration: 40,
        reason: "Bilan trimestriel diabète",
        notes: "HbA1c en amélioration (7.2% vs 8.1% il y a 3 mois). Patient respecte bien le régime alimentaire. Glycémie à jeun stable.",
        prescription: "Metformine 850mg x2 - continuer. Ajout Glimepiride 2mg matin.",
        measurements: JSON.stringify({ fastingGlucose: 95, randomGlucose: 149, hba1c: 7.2 }),
        videoLink: null,
        rating: 5,
        followUpDate: new Date("2025-03-22T14:30:00"),
        createdAt: new Date("2024-12-20T10:00:00"),
        updatedAt: new Date("2024-12-22T15:10:00"),
      }
    ];

    // Create sample consultations for the dedicated Consultations platform
    const consultationsAppData: Consultation[] = [
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: medecin.id,
        type: "teleconsultation",
        status: "scheduled",
        platform: "consultations",
        scheduledDate: new Date("2025-01-04T09:30:00"),
        duration: 30,
        reason: "Consultation cardiologique de routine",
        notes: null,
        prescription: null,
        measurements: null,
        videoLink: "https://meet.consultations.com/room/cardio123",
        rating: null,
        followUpDate: new Date("2025-02-04T09:30:00"),
        createdAt: new Date("2024-12-20T14:00:00"),
        updatedAt: new Date("2024-12-20T14:00:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: medecin.id,
        type: "consultation",
        status: "completed",
        platform: "consultations",
        scheduledDate: new Date("2024-12-21T11:00:00"),
        duration: 45,
        reason: "Bilan de santé annuel",
        notes: "Patient en bonne santé générale. Tous les paramètres vitaux dans la norme. Recommandations préventives données.",
        prescription: "Vitamines D3 1000UI - 1 fois par jour pendant 3 mois",
        measurements: null,
        videoLink: null,
        rating: 5,
        followUpDate: new Date("2025-12-21T11:00:00"),
        createdAt: new Date("2024-12-19T10:00:00"),
        updatedAt: new Date("2024-12-21T12:00:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patientDiabete.id,
        doctorId: diabetologue.id,
        type: "teleconsultation",
        status: "scheduled",
        platform: "consultations",
        scheduledDate: new Date("2025-01-05T16:00:00"),
        duration: 30,
        reason: "Consultation dermatologique",
        notes: null,
        prescription: null,
        measurements: null,
        videoLink: "https://meet.consultations.com/room/dermato456",
        rating: null,
        followUpDate: null,
        createdAt: new Date("2024-12-22T09:00:00"),
        updatedAt: new Date("2024-12-22T09:00:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patientDiabete.id,
        doctorId: medecin.id,
        type: "urgence",
        status: "completed",
        platform: "consultations",
        scheduledDate: new Date("2024-12-18T14:15:00"),
        duration: 20,
        reason: "Consultation urgente - fièvre persistante",
        notes: "Fièvre à 39°C depuis 2 jours. Examen clinique normal. Probable infection virale.",
        prescription: "Paracétamol 1g x3/jour pendant 5 jours. Repos et hydratation.",
        measurements: null,
        videoLink: null,
        rating: 4,
        followUpDate: new Date("2024-12-25T10:00:00"),
        createdAt: new Date("2024-12-18T14:00:00"),
        updatedAt: new Date("2024-12-18T14:35:00"),
      },
      {
        id: this.currentConsultationId++,
        patientId: patient.id,
        doctorId: diabetologue.id,
        type: "teleconsultation",
        status: "cancelled",
        platform: "consultations",
        scheduledDate: new Date("2024-12-19T15:30:00"),
        duration: 30,
        reason: "Consultation nutritionnelle",
        notes: "Annulée par le patient - conflit d'horaire",
        prescription: null,
        measurements: null,
        videoLink: "https://meet.consultations.com/room/nutri789",
        rating: null,
        followUpDate: null,
        createdAt: new Date("2024-12-17T11:00:00"),
        updatedAt: new Date("2024-12-19T08:00:00"),
      }
    ];

    // Store all consultations
    [...tensioConsultations, ...diabetoConsultations, ...consultationsAppData].forEach(consultation => {
      this.consultations.set(consultation.id, consultation);
    });

    // Create sample payment
    const payment: Payment = {
      id: this.currentPaymentId++,
      subscriptionId: subscription.id,
      amount: 5000,
      paymentMethod: "orange_money",
      transactionId: "OM240215001",
      status: "completed",
      paidAt: new Date("2024-02-15T10:30:00"),
      createdAt: new Date("2024-02-15T10:30:00"),
    };
    this.payments.set(payment.id, payment);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getMeasurements(patientId: number, limit?: number): Promise<Measurement[]> {
    const userMeasurements = Array.from(this.measurements.values())
      .filter(m => m.patientId === patientId)
      .sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());
    
    return limit ? userMeasurements.slice(0, limit) : userMeasurements;
  }

  async getMeasurementsByDateRange(patientId: number, startDate: Date, endDate: Date): Promise<Measurement[]> {
    return Array.from(this.measurements.values())
      .filter(m => 
        m.patientId === patientId &&
        m.measuredAt >= startDate &&
        m.measuredAt <= endDate
      )
      .sort((a, b) => a.measuredAt.getTime() - b.measuredAt.getTime());
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const measurement: Measurement = {
      id: this.currentMeasurementId++,
      ...insertMeasurement,
      context: insertMeasurement.context || null,
      comment: insertMeasurement.comment || null,
      createdAt: new Date(),
    };
    this.measurements.set(measurement.id, measurement);
    return measurement;
  }

  async deleteMeasurement(id: number): Promise<boolean> {
    return this.measurements.delete(id);
  }

  async getSubscription(patientId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(s => s.patientId === patientId);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const subscription: Subscription = {
      id: this.currentSubscriptionId++,
      ...insertSubscription,
      paymentMethod: insertSubscription.paymentMethod || null,
      createdAt: new Date(),
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async updateSubscriptionStatus(id: number, status: string): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (subscription) {
      subscription.status = status;
      this.subscriptions.set(id, subscription);
      return subscription;
    }
    return undefined;
  }

  async getPayments(subscriptionId: number): Promise<Payment[]> {
    return Array.from(this.payments.values())
      .filter(p => p.subscriptionId === subscriptionId)
      .sort((a, b) => (b.paidAt?.getTime() || 0) - (a.paidAt?.getTime() || 0));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const payment: Payment = {
      id: this.currentPaymentId++,
      ...insertPayment,
      transactionId: insertPayment.transactionId || null,
      paidAt: insertPayment.paidAt || null,
      createdAt: new Date(),
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (payment) {
      payment.status = status;
      if (status === "completed") {
        payment.paidAt = new Date();
      }
      this.payments.set(id, payment);
      return payment;
    }
    return undefined;
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const notification: Notification = {
      id: this.currentNotificationId++,
      ...insertNotification,
      isRead: insertNotification.isRead || false,
      createdAt: new Date(),
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
      return true;
    }
    return false;
  }
  
  // Medications
  async getMedications(patientId: number): Promise<Medication[]> {
    return Array.from(this.medications.values())
      .filter(med => med.patientId === patientId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createMedication(insertMedication: InsertMedication): Promise<Medication> {
    const medication: Medication = {
      id: this.currentMedicationId++,
      ...insertMedication,
      createdAt: new Date(),
    };
    this.medications.set(medication.id, medication);
    return medication;
  }

  async updateMedication(id: number, updates: Partial<Medication>): Promise<Medication | undefined> {
    const medication = this.medications.get(id);
    if (medication) {
      Object.assign(medication, updates);
      return medication;
    }
    return undefined;
  }

  async deleteMedication(id: number): Promise<boolean> {
    return this.medications.delete(id);
  }

  // Messages
  async getMessages(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.senderId === userId || msg.receiverId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getConversation(senderId: number, receiverId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => 
        (msg.senderId === senderId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === senderId)
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.currentMessageId++,
      ...insertMessage,
      createdAt: new Date(),
    };
    this.messages.set(message.id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.messages.get(id);
    if (message) {
      message.isRead = true;
      return true;
    }
    return false;
  }

  // Glucose Measurements (DiabetoCare specific methods)
  async getGlucoseMeasurements(patientId: number): Promise<GlucoseMeasurement[]> {
    return Array.from(this.glucoseMeasurements.values())
      .filter(measurement => measurement.patientId === patientId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime());
  }

  async createGlucoseMeasurement(insertGlucoseMeasurement: InsertGlucoseMeasurement): Promise<GlucoseMeasurement> {
    const glucoseMeasurement: GlucoseMeasurement = {
      id: this.currentGlucoseMeasurementId++,
      ...insertGlucoseMeasurement,
      createdAt: new Date(),
    };
    this.glucoseMeasurements.set(glucoseMeasurement.id, glucoseMeasurement);
    return glucoseMeasurement;
  }

  async deleteGlucoseMeasurement(id: number): Promise<boolean> {
    return this.glucoseMeasurements.delete(id);
  }

  // Consultations
  async getConsultations(filters?: { patientId?: number; doctorId?: number; platform?: string; status?: string }): Promise<Consultation[]> {
    let consultations = Array.from(this.consultations.values());
    
    if (filters) {
      if (filters.patientId) {
        consultations = consultations.filter(c => c.patientId === filters.patientId);
      }
      if (filters.doctorId) {
        consultations = consultations.filter(c => c.doctorId === filters.doctorId);
      }
      if (filters.platform) {
        consultations = consultations.filter(c => c.platform === filters.platform);
      }
      if (filters.status) {
        consultations = consultations.filter(c => c.status === filters.status);
      }
    }
    
    return consultations.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const consultation: Consultation = {
      id: this.currentConsultationId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...insertConsultation,
    };
    this.consultations.set(consultation.id, consultation);
    return consultation;
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const consultation = this.consultations.get(id);
    if (!consultation) return undefined;
    
    const updatedConsultation = { 
      ...consultation, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.consultations.set(id, updatedConsultation);
    return updatedConsultation;
  }

  async deleteConsultation(id: number): Promise<boolean> {
    return this.consultations.delete(id);
  }
}

export const storage = new MemStorage();
