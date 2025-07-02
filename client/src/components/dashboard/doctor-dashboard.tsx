import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  Activity, 
  Clock, 
  TrendingUp,
  MessageSquare,
  Pill,
  FileText
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import PatientDetailsDialog from "@/components/dialogs/patient-details-dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DoctorLimitsBanner from "@/components/doctor/doctor-limits-banner";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number>(1);

  // Mock data for doctor dashboard
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/doctor-dashboard'],
    queryFn: () => {
      return Promise.resolve({
        stats: {
          totalPatients: 15,
          activePatients: 12,
          todayConsultations: 4,
          pendingMessages: 7,
          criticalAlerts: 2,
          prescriptionsToReview: 3
        },
        todayConsultations: [
          {
            id: 1,
            patientName: "Marie Dupont",
            time: "09:00",
            type: "teleconsultation",
            status: "scheduled",
            urgency: "normal"
          },
          {
            id: 2,
            patientName: "Jean Martin",
            time: "14:00",
            type: "consultation",
            status: "completed",
            urgency: "high"
          },
          {
            id: 3,
            patientName: "Fatou Sow",
            time: "16:00",
            type: "teleconsultation",
            status: "scheduled",
            urgency: "normal"
          }
        ],
        criticalPatients: [
          {
            id: 1,
            name: "Jean Martin",
            lastMeasurement: { systolic: 165, diastolic: 102 },
            riskLevel: "high",
            lastSeen: new Date("2024-02-16T14:00:00"),
            alert: "Tension critique depuis 2 jours"
          },
          {
            id: 2,
            name: "Ahmed Traoré",
            lastMeasurement: { systolic: 155, diastolic: 98 },
            riskLevel: "moderate",
            lastSeen: new Date("2024-02-15T10:00:00"),
            alert: "Observance médicamenteuse faible"
          }
        ],
        recentMessages: [
          {
            id: 1,
            patientName: "Marie Dupont",
            message: "Docteur, j'ai des étourdissements ce matin...",
            time: new Date("2024-02-16T08:30:00"),
            priority: "high",
            isRead: false
          },
          {
            id: 2,
            patientName: "Fatou Sow",
            message: "Ma tension ce matin était de 142/85...",
            time: new Date("2024-02-16T07:15:00"),
            priority: "normal",
            isRead: false
          }
        ],
        weeklyStats: {
          consultations: 28,
          newPatients: 3,
          avgTension: { systolic: 138, diastolic: 86 },
          complianceRate: 82
        }
      });
    },
    enabled: !!user?.id,
  });

  if (isLoading || !dashboardData) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { stats, todayConsultations, criticalPatients, recentMessages, weeklyStats } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients totaux</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                <p className="text-xs text-green-600">+{stats.activePatients} actifs</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Consultations aujourd'hui</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayConsultations}</p>
                <p className="text-xs text-blue-600">{todayConsultations.filter(c => c.status === 'scheduled').length} à venir</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={stats.criticalAlerts > 0 ? 'border-red-200 bg-red-50' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alertes critiques</p>
                <p className={`text-2xl font-bold ${stats.criticalAlerts > 0 ? 'text-red-700' : 'text-gray-900'}`}>
                  {stats.criticalAlerts}
                </p>
                <p className="text-xs text-red-600">Nécessitent attention</p>
              </div>
              <div className={`p-3 rounded-full ${stats.criticalAlerts > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
                <AlertTriangle className={`w-6 h-6 ${stats.criticalAlerts > 0 ? 'text-red-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={stats.pendingMessages > 0 ? 'border-amber-200 bg-amber-50' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages non lus</p>
                <p className={`text-2xl font-bold ${stats.pendingMessages > 0 ? 'text-amber-700' : 'text-gray-900'}`}>
                  {stats.pendingMessages}
                </p>
                <p className="text-xs text-amber-600">En attente de réponse</p>
              </div>
              <div className={`p-3 rounded-full ${stats.pendingMessages > 0 ? 'bg-amber-100' : 'bg-gray-100'}`}>
                <MessageSquare className={`w-6 h-6 ${stats.pendingMessages > 0 ? 'text-amber-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Consultations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Consultations du jour</span>
              </span>
              <Badge variant="outline">{todayConsultations.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      consultation.urgency === 'high' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        consultation.urgency === 'high' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{consultation.patientName}</p>
                      <p className="text-sm text-gray-600">{consultation.time} • {consultation.type}</p>
                    </div>
                  </div>
                  <Badge className={
                    consultation.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    'bg-blue-100 text-blue-700'
                  }>
                    {consultation.status === 'completed' ? 'Terminée' : 'Planifiée'}
                  </Badge>
                </div>
              ))}
              {todayConsultations.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Aucune consultation aujourd'hui</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Critical Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Patients à surveiller</span>
              </span>
              <Badge variant="destructive">{criticalPatients.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalPatients.map((patient) => (
                <div key={patient.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-red-900">{patient.name}</p>
                    <Badge className={
                      patient.riskLevel === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }>
                      {patient.riskLevel === 'high' ? 'Risque élevé' : 'Risque modéré'}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="text-red-700">
                      <span className="font-medium">Dernière mesure:</span> {patient.lastMeasurement.systolic}/{patient.lastMeasurement.diastolic} mmHg
                    </p>
                    <p className="text-red-600">{patient.alert}</p>
                    <p className="text-gray-600">
                      Vu le {format(patient.lastSeen, "dd/MM à HH:mm", { locale: fr })}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Link href="/messages">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-700 border-red-300"
                        onClick={() => {
                          toast({
                            title: "Contacter le patient",
                            description: `Ouverture de la messagerie avec ${patient.name}`
                          });
                        }}
                      >
                        Contacter
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        setSelectedPatientId(patient.id);
                        setShowPatientDetails(true);
                      }}
                    >
                      Voir dossier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Messages récents</span>
              </span>
              <Link href="/messages">
                <Button variant="outline" size="sm">Voir tous</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className={`p-3 rounded-lg border ${
                  !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{message.patientName}</p>
                    <div className="flex items-center space-x-2">
                      {message.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {format(message.time, "HH:mm", { locale: fr })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 truncate">{message.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Statistiques hebdomadaires</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">{weeklyStats.consultations}</p>
                <p className="text-sm text-blue-600">Consultations</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{weeklyStats.newPatients}</p>
                <p className="text-sm text-green-600">Nouveaux patients</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-lg font-bold text-amber-700">
                  {weeklyStats.avgTension.systolic}/{weeklyStats.avgTension.diastolic}
                </p>
                <p className="text-sm text-amber-600">Tension moyenne</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-700">{weeklyStats.complianceRate}%</p>
                <p className="text-sm text-purple-600">Observance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/consultations">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 w-full">
                <Calendar className="w-6 h-6" />
                <span>Planifier consultation</span>
              </Button>
            </Link>
            <Link href="/prescriptions">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 w-full">
                <Pill className="w-6 h-6" />
                <span>Nouvelle prescription</span>
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 w-full">
                <FileText className="w-6 h-6" />
                <span>Générer rapport</span>
              </Button>
            </Link>
            <Link href="/reports?tab=trends">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 w-full">
                <Activity className="w-6 h-6" />
                <span>Voir statistiques</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <PatientDetailsDialog 
        open={showPatientDetails}
        onOpenChange={setShowPatientDetails}
        patientId={selectedPatientId}
      />
    </div>
  );
}