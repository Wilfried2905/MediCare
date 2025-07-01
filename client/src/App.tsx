import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { SubscriptionProvider } from "@/hooks/use-subscription";
import { DoctorLimitsProvider } from "@/hooks/use-doctor-limits";
import HomePage from "@/pages/home";
import Login from "@/pages/login";
import DiabetoCareLogin from "@/pages/diabetocare-login";
import DiabetoCarePatientDashboard from "@/pages/diabetocare-patient-dashboard";
import DiabetoCareDoctorDashboard from "@/pages/diabetocare-doctor-dashboard";
import DiabetoCareAdminDashboard from "@/pages/diabetocare-admin-dashboard";
import DiabetoCareMeasurements from "@/pages/diabetocare-measurements";
import DiabetoCareMedications from "@/pages/diabetocare-medications";
import DiabetoCareMessages from "@/pages/diabetocare-messages";
import DiabetoCareSubscription from "@/pages/diabetocare-subscription";
import DiabetoCareLayout from "@/components/layout/diabetocare-layout";
// Pages spécialisées médecin DiabetoCare
import DiabetoCareDoctorPatients from "@/pages/diabetocare-doctor-patients";
import DiabetoCareDoctorConsultations from "@/pages/diabetocare-doctor-consultations";
import DiabetoCareDoctorMessages from "@/pages/diabetocare-doctor-messages";
import DiabetoCareDoctorPrescriptions from "@/pages/diabetocare-doctor-prescriptions";
import DiabetoCareDoctorReports from "@/pages/diabetocare-doctor-reports";
// Pages spécialisées admin DiabetoCare
import DiabetoCareAdminUsers from "@/pages/diabetocare-admin-users";
import DiabetoCareAdminSubscriptions from "@/pages/diabetocare-admin-subscriptions";
import DiabetoCareAdminPayments from "@/pages/diabetocare-admin-payments";
import DiabetoCareAdminStatistics from "@/pages/diabetocare-admin-statistics";
// Consultations imports
import ConsultationsLogin from "@/pages/consultations-login";
import ConsultationsPatientDashboard from "@/pages/consultations-patient-dashboard";
import ConsultationsDoctorDashboard from "@/pages/consultations-doctor-dashboard";
import ConsultationsAdminDashboard from "@/pages/consultations-admin-dashboard";
import ConsultationsDoctorProfile from "@/pages/consultations-doctor-profile";
import ConsultationsAppointmentsList from "@/pages/consultations-appointments-list";
import ConsultationsBookAppointment from "@/pages/consultations-book-appointment";
import ConsultationsEmergencyAppointment from "@/pages/consultations-emergency-appointment";
import ConsultationsMedicalRecord from "@/pages/consultations-medical-record";
import ConsultationsMessages from "@/pages/consultations-messages";
import ConsultationsProfile from "@/pages/consultations-profile";
import ConsultationsReviews from "@/pages/consultations-reviews";
// Consultations Doctor pages
import ConsultationsDoctorPatients from "@/pages/consultations-doctor-patients";
import ConsultationsDoctorMessages from "@/pages/consultations-doctor-messages";
import ConsultationsDoctorPrescriptions from "@/pages/consultations-doctor-prescriptions";
import ConsultationsDoctorStats from "@/pages/consultations-doctor-stats";
import ConsultationsDoctorSchedule from "@/pages/consultations-doctor-schedule";
import ConsultationsDoctorConsultation from "@/pages/consultations-doctor-consultation";
import Dashboard from "@/pages/dashboard";
import Measurements from "@/pages/measurements";
import Medications from "@/pages/medications";
import SimpleChat from "@/components/messaging/simple-chat";
import Patients from "@/pages/patients";
import Consultations from "@/pages/consultations";
import Prescriptions from "@/pages/prescriptions";
import Reports from "@/pages/reports";
import Subscription from "@/pages/subscription";
import Users from "@/pages/users";
import Payments from "@/pages/payments";
import Subscriptions from "@/pages/subscriptions";
import Statistics from "@/pages/statistics";
import PaymentDashboard from "@/pages/payment-dashboard";
import PaymentAnalytics from "@/pages/payment-analytics";
import Monitoring from "@/pages/monitoring";
import Settings from "@/pages/settings";
import MainLayout from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";

function AuthenticatedRoutes() {
  return (
    <Switch>
      {/* TensioCare routes - WITH MainLayout */}
      <Route path="*">
        <MainLayout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/tensiocare" component={Dashboard} />
            <Route path="/measurements" component={Measurements} />
            <Route path="/medications" component={Medications} />
            <Route path="/messages" component={SimpleChat} />
            <Route path="/patients" component={Patients} />
            <Route path="/consultations" component={Consultations} />
            <Route path="/prescriptions" component={Prescriptions} />
            <Route path="/reports" component={Reports} />
            <Route path="/subscription" component={Subscription} />
            <Route path="/users" component={Users} />
            <Route path="/payments" component={Payments} />
            <Route path="/subscriptions" component={Subscriptions} />
            <Route path="/statistiques" component={Statistics} />
            <Route path="/payment-dashboard" component={PaymentDashboard} />
            <Route path="/payment-analytics" component={PaymentAnalytics} />
            <Route path="/monitoring" component={Monitoring} />
            <Route path="/settings" component={Settings} />
            <Route>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Page non trouvée</h1>
                  <p className="text-gray-600">La page que vous cherchez n'existe pas.</p>
                </div>
              </div>
            </Route>
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/diabetocare-login" component={DiabetoCareLogin} />
      
      {/* DiabetoCare authenticated routes */}
      <Route path="/diabetocare-patient-dashboard">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCarePatientDashboard />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-dashboard">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCarePatientDashboard />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-doctor-dashboard">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorDashboard />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-admin-dashboard">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminDashboard />
          </DiabetoCareLayout>
        )}
      </Route>
      
      {/* Routes spécifiques médecin DiabetoCare */}
      <Route path="/diabetocare-patients">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorPatients />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-consultations">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorConsultations />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-doctor-messages">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorMessages />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-prescriptions">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorPrescriptions />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-reports">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareDoctorReports />
          </DiabetoCareLayout>
        )}
      </Route>
      
      {/* Routes spécifiques admin DiabetoCare */}
      <Route path="/diabetocare-users">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminUsers />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-subscriptions">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminSubscriptions />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-payments">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminPayments />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-statistics">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminStatistics />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-admin-statistics">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareAdminStatistics />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-measurements">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareMeasurements />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-medications">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareMedications />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-messages">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareMessages />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare-subscription">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCareSubscription />
          </DiabetoCareLayout>
        )}
      </Route>
      <Route path="/diabetocare">
        {!user ? <DiabetoCareLogin /> : (
          <DiabetoCareLayout>
            <DiabetoCarePatientDashboard />
          </DiabetoCareLayout>
        )}
      </Route>
      
      {/* Consultations Routes */}
      <Route path="/consultations-login" component={ConsultationsLogin} />
      <Route path="/consultations-patient-dashboard">
        {!user ? <ConsultationsLogin /> : <ConsultationsPatientDashboard />}
      </Route>
      <Route path="/consultations-doctor-dashboard">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorDashboard />}
      </Route>
      <Route path="/consultations-admin-dashboard">
        {!user ? <ConsultationsLogin /> : <ConsultationsAdminDashboard />}
      </Route>
      <Route path="/consultations-doctor-profile/:id" component={ConsultationsDoctorProfile} />
      <Route path="/consultations-doctor-profile" component={ConsultationsDoctorProfile} />
      <Route path="/consultations-appointments-list" component={ConsultationsAppointmentsList} />
      <Route path="/consultations-book-appointment" component={ConsultationsBookAppointment} />
      <Route path="/consultations-emergency-appointment" component={ConsultationsEmergencyAppointment} />
      <Route path="/consultations-medical-record" component={ConsultationsMedicalRecord} />
      <Route path="/consultations-messages" component={ConsultationsMessages} />
      <Route path="/consultations-profile" component={ConsultationsProfile} />
      <Route path="/consultations-reviews" component={ConsultationsReviews} />
      
      {/* Consultations Doctor specific routes */}
      <Route path="/consultations-doctor-patients">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorPatients />}
      </Route>
      <Route path="/consultations-doctor-messages">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorMessages />}
      </Route>
      <Route path="/consultations-doctor-prescriptions">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorPrescriptions />}
      </Route>
      <Route path="/consultations-doctor-stats">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorStats />}
      </Route>
      <Route path="/consultations-doctor-schedule">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorSchedule />}
      </Route>
      <Route path="/consultations-doctor-consultation">
        {!user ? <ConsultationsLogin /> : <ConsultationsDoctorConsultation />}
      </Route>
      
      <Route path="*">
        {!user ? <Login /> : <AuthenticatedRoutes />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <DoctorLimitsProvider>
              <Router />
              <Toaster />
            </DoctorLimitsProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;