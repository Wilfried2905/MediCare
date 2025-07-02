import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Activity } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getBloodPressureStatus } from "@/lib/blood-pressure-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function HistoricalMeasurements() {
  const { user } = useAuth();
  
  const { data: measurements = [], isLoading } = useQuery({
    queryKey: ['/api/measurements'],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Historique complet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getContextDisplay = (context: string) => {
    const contexts = {
      'matin_repos': '🌅 Matin au repos',
      'soir_repos': '🌙 Soir au repos',
      'avant_repas': '🍽️ Avant repas',
      'apres_repas': '🍽️ Après repas',
      'apres_activite': '🏃 Après activité',
      'stress': '😰 Période de stress',
      'medicament': '💊 Après médicament',
      'normal': '📋 Condition normale'
    };
    return contexts[context] || '📋 Normal';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Historique des mesures</span>
          </div>
          <Badge variant="outline">{measurements.length} mesures</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {measurements.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucune mesure enregistrée</p>
              <p className="text-sm text-gray-400">Commencez par ajouter votre première mesure</p>
            </div>
          ) : (
            measurements.map((measurement) => {
              const status = getBloodPressureStatus(measurement.systolic, measurement.diastolic);
              
              return (
                <div key={measurement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`text-lg font-bold ${status.color}`}>
                        {measurement.systolic}/{measurement.diastolic}
                      </div>
                      <Badge className={`${status.bgColor} ${status.color} border ${status.borderColor}`}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {measurement.pulse} bpm
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(new Date(measurement.createdAt || measurement.measuredAt), "dd/MM/yyyy 'à' HH:mm", { locale: fr })}
                      </span>
                    </div>
                    {measurement.context && (
                      <div className="text-blue-600">
                        {getContextDisplay(measurement.context)}
                      </div>
                    )}
                  </div>
                  
                  {measurement.notes && (
                    <div className="mt-2 text-sm text-gray-700 bg-gray-100 rounded p-2">
                      <span className="font-medium">Note :</span> {measurement.notes}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}