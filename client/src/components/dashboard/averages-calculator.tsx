import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getBloodPressureStatus } from "@/lib/blood-pressure-utils";

export default function AveragesCalculator() {
  const { user } = useAuth();
  
  const { data: measurements = [], isLoading } = useQuery({
    queryKey: ['/api/measurements'],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Moyennes calculées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculs des moyennes
  const calculateAverageForPeriod = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const periodMeasurements = measurements.filter(m => 
      new Date(m.createdAt || m.measuredAt) >= cutoffDate
    );
    
    if (periodMeasurements.length === 0) return null;
    
    const avgSystolic = Math.round(
      periodMeasurements.reduce((sum, m) => sum + m.systolic, 0) / periodMeasurements.length
    );
    const avgDiastolic = Math.round(
      periodMeasurements.reduce((sum, m) => sum + m.diastolic, 0) / periodMeasurements.length
    );
    const avgPulse = Math.round(
      periodMeasurements.reduce((sum, m) => sum + m.pulse, 0) / periodMeasurements.length
    );
    
    return {
      systolic: avgSystolic,
      diastolic: avgDiastolic,
      pulse: avgPulse,
      count: periodMeasurements.length,
      status: getBloodPressureStatus(avgSystolic, avgDiastolic)
    };
  };

  const dailyAvg = calculateAverageForPeriod(1);
  const weeklyAvg = calculateAverageForPeriod(7);
  const monthlyAvg = calculateAverageForPeriod(30);

  const renderAverageCard = (period: string, avg: any, icon: React.ReactNode) => {
    if (!avg) {
      return (
        <div className="text-center py-4">
          <div className="text-gray-400 mb-2">{icon}</div>
          <p className="text-sm text-gray-500">Pas assez de données</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600">{icon}</div>
            <span className="font-medium">{period}</span>
          </div>
          <Badge variant="outline">{avg.count} mesures</Badge>
        </div>
        
        <div className={`p-4 rounded-lg ${avg.status.bgColor} border ${avg.status.borderColor}`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${avg.status.color}`}>
              {avg.systolic}/{avg.diastolic}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Pouls: {avg.pulse} bpm
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${avg.status.bgColor} ${avg.status.color} border ${avg.status.borderColor}`}>
              {avg.status.label}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Moyennes calculées</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Jour</TabsTrigger>
            <TabsTrigger value="weekly">Semaine</TabsTrigger>
            <TabsTrigger value="monthly">Mois</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4">
            {renderAverageCard("Dernières 24h", dailyAvg, <Calendar className="w-5 h-5" />)}
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-4">
            {renderAverageCard("7 derniers jours", weeklyAvg, <TrendingUp className="w-5 h-5" />)}
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-4">
            {renderAverageCard("30 derniers jours", monthlyAvg, <BarChart3 className="w-5 h-5" />)}
          </TabsContent>
        </Tabs>
        
        {measurements.length === 0 && (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Aucune donnée disponible</p>
            <p className="text-sm text-gray-400">Commencez par enregistrer quelques mesures</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}