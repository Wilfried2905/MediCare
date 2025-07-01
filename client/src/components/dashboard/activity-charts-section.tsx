import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

export default function ActivityChartsSection() {
  return (
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
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">Nouveau médecin inscrit</span>
              <span className="text-gray-600">Il y a 2h</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">Paiement traité</span>
              <span className="text-gray-600">Il y a 6h</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">Alerte système</span>
              <span className="text-gray-600">Il y a 10min</span>
            </div>
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
  );
}