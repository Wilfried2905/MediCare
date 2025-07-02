import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Activity, CreditCard, Settings, UserPlus, Shield, AlertTriangle, TrendingUp, Database, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("7j");

  // Données de démonstration pour l'administrateur
  const adminStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 22835000, // En FCFA
    monthlyGrowth: 12.5,
    systemHealth: 98.7,
    pendingPayments: 23,
    criticalAlerts: 3,
    newRegistrations: 45
  };

  // Données pour les graphiques
  const activityData = [
    { name: "Lun", nouveaux: 12, paiements: 8, alertes: 2 },
    { name: "Mar", nouveaux: 19, paiements: 15, alertes: 1 },
    { name: "Mer", nouveaux: 8, paiements: 12, alertes: 3 },
    { name: "Jeu", nouveaux: 15, paiements: 18, alertes: 1 },
    { name: "Ven", nouveaux: 22, paiements: 25, alertes: 0 },
    { name: "Sam", nouveaux: 16, paiements: 20, alertes: 2 },
    { name: "Dim", nouveaux: 11, paiements: 14, alertes: 1 }
  ];

  const userDistribution = [
    { name: "Patients", value: 1089, color: "#3b82f6" },
    { name: "Médecins", value: 145, color: "#10b981" },
    { name: "Administrateurs", value: 13, color: "#f59e0b" }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      role: "patient",
      status: "active",
      registeredAt: new Date("2024-02-15T10:30:00"),
      lastPayment: new Date("2024-02-01T09:00:00")
    },
    {
      id: 2,
      name: "Dr. Ahmed Kone",
      email: "a.kone@hopital.fr",
      role: "medecin",
      status: "active",
      registeredAt: new Date("2024-02-14T14:20:00"),
      lastPayment: null
    },
    {
      id: 3,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      role: "patient",
      status: "suspended",
      registeredAt: new Date("2024-02-13T16:45:00"),
      lastPayment: new Date("2024-01-15T10:00:00")
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "critical",
      message: "Échec de paiement détecté pour 23 utilisateurs",
      timestamp: new Date("2024-02-16T08:30:00"),
      resolved: false
    },
    {
      id: 2,
      type: "warning",
      message: "Charge serveur élevée (85% CPU)",
      timestamp: new Date("2024-02-16T07:15:00"),
      resolved: false
    },
    {
      id: 3,
      type: "info",
      message: "Mise à jour système programmée pour ce soir",
      timestamp: new Date("2024-02-16T06:00:00"),
      resolved: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 border-red-200 text-red-700';
      case 'warning': return 'bg-orange-100 border-orange-200 text-orange-700';
      case 'info': return 'bg-blue-100 border-blue-200 text-blue-700';
      default: return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Administrateur</h1>
          <p className="text-gray-600 mt-1">Gestion complète de la plateforme TensioCare</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7j">7 jours</SelectItem>
              <SelectItem value="30j">30 jours</SelectItem>
              <SelectItem value="90j">3 mois</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => {
              toast({
                title: "Actualisation",
                description: "Données mises à jour avec succès"
              });
            }}
          >
            <Activity className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">
                  +{adminStats.newRegistrations} cette semaine
                </p>
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
                <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                <p className="text-2xl font-bold text-gray-900">{adminStats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}% du total
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(adminStats.totalRevenue).toLocaleString()} FCFA</p>
                <p className="text-xs text-green-600 mt-1">
                  +{adminStats.monthlyGrowth}% vs mois dernier
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Santé système</p>
                <p className="text-2xl font-bold text-gray-900">{adminStats.systemHealth}%</p>
                <p className="text-xs text-orange-600 mt-1">
                  {adminStats.criticalAlerts} alertes critiques
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente et répartition avec graphiques Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nouveaux" fill="#3b82f6" name="Nouveaux médecins" />
                  <Bar dataKey="paiements" fill="#10b981" name="Paiements traités" />
                  <Bar dataKey="alertes" fill="#f59e0b" name="Alertes système" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <span className="font-medium">{activity.title}</span>
                  <span className="text-gray-600">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Répartition des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {userDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nouveaux graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: "Jan", revenue: 1850000 },
                  { month: "Fév", revenue: 2150000 },
                  { month: "Mar", revenue: 2834500 },
                  { month: "Avr", revenue: 3200000 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, "Revenus"]} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Croissance utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { week: "S1", nouveaux: 45 },
                  { week: "S2", nouveaux: 38 },
                  { week: "S3", nouveaux: 52 },
                  { week: "S4", nouveaux: 67 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nouveaux" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Méthodes de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Orange Money", value: 45, color: "#ff8c00" },
                      { name: "MTN Mobile Money", value: 32, color: "#ffcd00" },
                      { name: "Moov Money", value: 23, color: "#00a651" }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {[
                      { name: "Orange Money", value: 45, color: "#ff8c00" },
                      { name: "MTN Mobile Money", value: 32, color: "#ffcd00" },
                      { name: "Moov Money", value: 23, color: "#00a651" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nouveaux graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: "Jan", revenue: 1850000 },
                  { month: "Fév", revenue: 2150000 },
                  { month: "Mar", revenue: 2834500 },
                  { month: "Avr", revenue: 3200000 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, "Revenus"]} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Croissance utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { week: "S1", nouveaux: 45 },
                  { week: "S2", nouveaux: 38 },
                  { week: "S3", nouveaux: 52 },
                  { week: "S4", nouveaux: 67 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nouveaux" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Méthodes de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Orange Money", value: 45, color: "#ff8c00" },
                      { name: "MTN Mobile Money", value: 32, color: "#ffcd00" },
                      { name: "Moov Money", value: 23, color: "#00a651" }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {[
                      { name: "Orange Money", value: 45, color: "#ff8c00" },
                      { name: "MTN Mobile Money", value: 32, color: "#ffcd00" },
                      { name: "Moov Money", value: 23, color: "#00a651" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Actions rapides</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Nouvel utilisateur",
                  description: "Interface de création d'utilisateur ouverte"
                });
              }}
            >
              <UserPlus className="w-6 h-6" />
              <span className="text-sm">Ajouter utilisateur</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Gestion des paiements",
                  description: "Module de paiements ouvert"
                });
              }}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-sm">Paiements</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Rapports système",
                  description: "Génération de rapports en cours"
                });
              }}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Rapports</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Base de données",
                  description: "Outils de maintenance ouverts"
                });
              }}
            >
              <Database className="w-6 h-6" />
              <span className="text-sm">Base de données</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Notifications",
                  description: "Centre de notifications ouvert"
                });
              }}
            >
              <Bell className="w-6 h-6" />
              <span className="text-sm">Notifications</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => {
                toast({
                  title: "Configuration",
                  description: "Paramètres système ouverts"
                });
              }}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">Configuration</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilisateurs récents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Utilisateurs récents</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Gestion utilisateurs",
                    description: "Interface complète ouverte"
                  });
                }}
              >
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Inscrit le {format(user.registeredAt, "dd/MM/yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'En attente'}
                    </Badge>
                    <Badge variant="outline">
                      {user.role === 'patient' ? 'Patient' : user.role === 'medecin' ? 'Médecin' : 'Admin'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertes système */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Alertes système</span>
              <Badge variant="destructive" className="ml-2">
                {systemAlerts.filter(alert => !alert.resolved).length} actives
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium capitalize">{alert.type}</span>
                        {alert.resolved && (
                          <Badge className="bg-green-100 text-green-700 text-xs">Résolu</Badge>
                        )}
                      </div>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <p className="text-xs mt-2 opacity-75">
                        {format(alert.timestamp, "dd/MM à HH:mm", { locale: fr })}
                      </p>
                    </div>
                    {!alert.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Alerte traitée",
                            description: "L'alerte a été marquée comme résolue"
                          });
                        }}
                      >
                        Résoudre
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}