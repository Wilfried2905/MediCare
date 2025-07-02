import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { getBloodPressureStatus } from "@/lib/blood-pressure-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Activity, TrendingUp, AlertTriangle, Heart } from "lucide-react";

export default function EnhancedOverviewCards() {
  const { user } = useAuth();
  
  const { data: measurements = [], isLoading } = useQuery({
    queryKey: ['/api/measurements'],
    enabled: !!user?.id,
  });

  const { data: subscription } = useQuery({
    queryKey: ['/api/subscription'],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4 sm:p-6">
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const latestMeasurement = measurements[0];
  
  // Calcul moyennes 7 jours
  const weeklyMeasurements = measurements.slice(0, 7);
  const weeklyAvgSystolic = weeklyMeasurements.length > 0 
    ? Math.round(weeklyMeasurements.reduce((sum, m) => sum + m.systolic, 0) / weeklyMeasurements.length)
    : 0;
  const weeklyAvgDiastolic = weeklyMeasurements.length > 0
    ? Math.round(weeklyMeasurements.reduce((sum, m) => sum + m.diastolic, 0) / weeklyMeasurements.length)
    : 0;

  // Status de la tension actuelle selon OMS 2023
  const currentStatus = latestMeasurement ? 
    getBloodPressureStatus(latestMeasurement.systolic, latestMeasurement.diastolic) : null;
  
  // Vérification d'expiration d'abonnement (3 jours)
  const isSubscriptionExpiringSoon = subscription?.endDate ? 
    (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 3 : false;

  return (
    <div className="space-y-6">
      {/* Bannière d'alerte paiement */}
      {isSubscriptionExpiringSoon && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <span className="font-medium">Votre abonnement expire bientôt !</span>
            <br />
            Renouvelez avant le {subscription?.endDate ? format(new Date(subscription.endDate), "dd/MM/yyyy") : ''} pour continuer votre suivi.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Dernière mesure avec indicateurs visuels */}
        <Card className={`transition-colors ${
          currentStatus?.riskLevel === 'critical' ? 'border-red-200 bg-red-50' : 
          currentStatus?.riskLevel === 'high' || currentStatus?.riskLevel === 'moderate' ? 'border-amber-200 bg-amber-50' : 
          latestMeasurement ? 'border-green-200 bg-green-50' : 'border-gray-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Dernière mesure</h3>
              <div className={`p-2 rounded-full ${
                currentStatus?.riskLevel === 'critical' ? 'bg-red-100' : 
                currentStatus?.riskLevel === 'high' || currentStatus?.riskLevel === 'moderate' ? 'bg-amber-100' : 
                latestMeasurement ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Activity className={`w-4 h-4 ${
                  currentStatus?.riskLevel === 'critical' ? 'text-red-600' : 
                  currentStatus?.riskLevel === 'high' || currentStatus?.riskLevel === 'moderate' ? 'text-amber-600' : 
                  latestMeasurement ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
            </div>
            
            {latestMeasurement ? (
              <>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {latestMeasurement.systolic}/{latestMeasurement.diastolic}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3 ${currentStatus?.bgColor} ${currentStatus?.color} border ${currentStatus?.borderColor}`}>
                  {currentStatus?.label}
                </div>
                <p className="text-xs text-gray-500">
                  {format(new Date(latestMeasurement.createdAt || latestMeasurement.measuredAt), "dd MMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucune mesure</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Moyenne 7 jours */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Moyenne 7 jours</h3>
              <div className="p-2 bg-blue-100 rounded-full">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {weeklyMeasurements.length > 0 ? `${weeklyAvgSystolic}/${weeklyAvgDiastolic}` : "N/A"}
            </div>
            <p className="text-xs text-gray-500">
              Basé sur {weeklyMeasurements.length} mesure{weeklyMeasurements.length > 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        {/* Statut abonnement avec indicateurs visuels */}
        <Card className={`transition-colors ${
          subscription?.status === 'active' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Abonnement</h3>
              <div className={`p-2 rounded-full ${
                subscription?.status === 'active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  subscription?.status === 'active' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            
            <div className={`text-2xl font-bold mb-2 ${
              subscription?.status === 'active' ? 'text-green-700' : 'text-red-700'
            }`}>
              {subscription?.status === 'active' ? 'Actif' : 'Expiré'}
            </div>
            <p className="text-xs text-gray-500">
              {subscription?.endDate ? `Expire le ${format(new Date(subscription.endDate), "dd/MM/yyyy")}` : "Aucun abonnement"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}