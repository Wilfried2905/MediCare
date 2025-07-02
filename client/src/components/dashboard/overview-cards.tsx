import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { getBloodPressureStatus } from "@/lib/blood-pressure-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Activity, TrendingUp } from "lucide-react";

export default function OverviewCards() {
  const { user } = useAuth();
  
  const { data: measurements = [] } = useQuery({
    queryKey: ['/api/measurements'],
    enabled: !!user?.id,
  });

  const { data: subscription } = useQuery({
    queryKey: ['/api/subscription', user?.id],
    enabled: !!user?.id,
  });

  const latestMeasurement = measurements[0];
  
  // Calculate weekly average
  const weeklyMeasurements = measurements.slice(0, 7);
  const weeklyAvgSystolic = weeklyMeasurements.length > 0 
    ? Math.round(weeklyMeasurements.reduce((sum, m) => sum + m.systolic, 0) / weeklyMeasurements.length)
    : 0;
  const weeklyAvgDiastolic = weeklyMeasurements.length > 0
    ? Math.round(weeklyMeasurements.reduce((sum, m) => sum + m.diastolic, 0) / weeklyMeasurements.length)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'elevated': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'elevated': return 'Élevé';
      case 'high': return 'Critique';
      default: return 'Inconnu';
    }
  };

  const getSubscriptionStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'expired': return 'Expiré';
      case 'trial': return 'Essai gratuit';
      case 'grace_period': return 'Période de grâce';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Last Measurement */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Dernière mesure</h3>
            <div className={`w-3 h-3 rounded-full ${latestMeasurement ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
          
          {latestMeasurement ? (
            <>
              <div className={`blood-pressure-${getBloodPressureStatus(latestMeasurement.systolic, latestMeasurement.diastolic)} text-white rounded-xl p-4 mb-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{latestMeasurement.systolic}/{latestMeasurement.diastolic}</p>
                    <p className="text-sm opacity-90">mmHg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{latestMeasurement.pulse}</p>
                    <p className="text-sm opacity-90">bpm</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {format(new Date(latestMeasurement.measuredAt), 'dd MMMM, HH:mm', { locale: fr })}
              </p>
              <p className={`text-sm font-medium ${getBloodPressureStatus(latestMeasurement.systolic, latestMeasurement.diastolic).color}`}>
                {getBloodPressureStatus(latestMeasurement.systolic, latestMeasurement.diastolic).label}
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucune mesure enregistrée</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Average */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Moyenne 7 jours</h3>
            <TrendingUp className="w-5 h-5 text-[var(--turquoise)]" />
          </div>
          
          {weeklyMeasurements.length > 0 ? (
            <>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {weeklyAvgSystolic}/{weeklyAvgDiastolic}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-[var(--amber-alert)]">↗</span>
                <span className="text-gray-600">+3 mmHg vs semaine précédente</span>
              </div>
              <div className="mt-4 text-sm">
                <p className="text-gray-600">Objectif : <span className="font-medium">130/80</span></p>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Pas assez de données</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Status */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Abonnement</h3>
            <div className={`w-3 h-3 rounded-full ${subscription?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          {subscription ? (
            <>
              <div className={`text-2xl font-bold mb-1 ${subscription.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {getSubscriptionStatusText(subscription.status)}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Expire le {format(new Date(subscription.endDate), 'dd MMMM yyyy', { locale: fr })}
              </p>
              {subscription.status === 'active' && (
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-700 flex items-center">
                    <span className="text-green-500 mr-1">✓</span>
                    Toutes les fonctionnalités disponibles
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Aucun abonnement trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
