import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { getBloodPressureStatus } from "@/lib/blood-pressure-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { Link } from "wouter";

export default function RecentMeasurements() {
  const { user } = useAuth();
  
  const { data: measurements = [] } = useQuery({
    queryKey: ['/api/measurements'],
    queryParams: { patientId: user?.id, limit: 3 },
    enabled: !!user?.id,
  });

  const getStatusIcon = (systolic: number, diastolic: number) => {
    const status = getBloodPressureStatus(systolic, diastolic);
    if (status.riskLevel === 'low') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status.riskLevel === 'critical') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
  };

  const getStatusBadge = (systolic: number, diastolic: number) => {
    const status = getBloodPressureStatus(systolic, diastolic);
    return (
      <Badge className={`${status.color} ${status.bgColor} border ${status.borderColor}`}>
        {status.label}
      </Badge>
    );
  };

  return (
    <Card className="medical-card">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mesures récentes</h3>
        
        {measurements.length > 0 ? (
          <div className="space-y-4">
            {measurements.map((measurement) => {
              return (
                <div key={measurement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(measurement.systolic, measurement.diastolic)}
                    <div>
                      <div className="font-medium text-gray-900">
                        {measurement.systolic}/{measurement.diastolic} mmHg
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(measurement.createdAt), 'dd MMM à HH:mm', { locale: fr })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(measurement.systolic, measurement.diastolic)}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Aucune mesure enregistrée</p>
          </div>
        )}
        
        <Link href="/measurements">
          <Button variant="ghost" className="w-full mt-4 text-[var(--turquoise)] hover:text-[var(--turquoise)]/80">
            Voir tout l'historique →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
