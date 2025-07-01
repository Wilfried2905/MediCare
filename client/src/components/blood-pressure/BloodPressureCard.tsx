import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Heart, Activity } from "lucide-react";
import { getBloodPressureStatus, formatBloodPressure } from "@/lib/blood-pressure-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BloodPressureCardProps {
  measurement: {
    id: number;
    systolic: number;
    diastolic: number;
    pulse?: number;
    context?: string;
    notes?: string;
    createdAt: Date;
  };
  showDetails?: boolean;
}

export function BloodPressureCard({ measurement, showDetails = true }: BloodPressureCardProps) {
  const status = getBloodPressureStatus(measurement.systolic, measurement.diastolic);
  
  const TrendIcon = status.riskLevel === 'critical' ? AlertTriangle : Heart;
  
  return (
    <Card className={`${status.bgColor} ${status.borderColor} border-2 transition-all hover:shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendIcon className={`h-5 w-5 ${status.color}`} />
            {formatBloodPressure(measurement.systolic, measurement.diastolic)}
          </CardTitle>
          <Badge variant="outline" className={`${status.color} ${status.borderColor}`}>
            {status.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {format(measurement.createdAt, "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
        </p>
      </CardHeader>
      
      {showDetails && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Métriques supplémentaires */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Systolique:</span>
                <p className="font-medium">{measurement.systolic} mmHg</p>
              </div>
              <div>
                <span className="text-muted-foreground">Diastolique:</span>
                <p className="font-medium">{measurement.diastolic} mmHg</p>
              </div>
              {measurement.pulse && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Pouls:</span>
                  <p className="font-medium flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {measurement.pulse} bpm
                  </p>
                </div>
              )}
            </div>

            {/* Classification OMS 2023 */}
            <div className="p-3 rounded-lg bg-white/50 border border-gray-200">
              <div className="text-sm">
                <p className="font-medium mb-1 text-gray-700">Classification OMS 2023:</p>
                <p className="text-xs text-muted-foreground">
                  Systolique: {status.systolicRange} mmHg | Diastolique: {status.diastolicRange} mmHg
                </p>
              </div>
            </div>

            {/* Contexte */}
            {measurement.context && (
              <div>
                <span className="text-sm text-muted-foreground">Contexte:</span>
                <p className="text-sm font-medium capitalize">{measurement.context}</p>
              </div>
            )}

            {/* Notes */}
            {measurement.notes && (
              <div>
                <span className="text-sm text-muted-foreground">Observations:</span>
                <p className="text-sm mt-1 p-2 bg-white/50 rounded text-gray-700">
                  {measurement.notes}
                </p>
              </div>
            )}

            {/* Recommandations selon le niveau de risque */}
            {status.recommendations.length > 0 && (
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700">Recommandations OMS:</span>
                <ul className="text-xs mt-1 space-y-1">
                  {status.recommendations.slice(0, 2).map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Alerte si critique */}
            {status.isUrgent && (
              <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-medium">Consultation médicale recommandée</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function BloodPressureCompactCard({ measurement }: { measurement: { systolic: number; diastolic: number; createdAt: Date; } }) {
  const status = getBloodPressureStatus(measurement.systolic, measurement.diastolic);
  
  return (
    <div className={`p-3 rounded-lg ${status.bgColor} ${status.borderColor} border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">
            {formatBloodPressure(measurement.systolic, measurement.diastolic)}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(measurement.createdAt, "dd/MM HH:mm")}
          </p>
        </div>
        <Badge variant="outline" className={`text-xs ${status.color}`}>
          {status.label}
        </Badge>
      </div>
    </div>
  );
}