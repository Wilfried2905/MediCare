import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

export default function TrendChart() {
  const { user } = useAuth();
  const [period, setPeriod] = useState(7);
  
  const startDate = subDays(new Date(), period);
  const endDate = new Date();

  const { data: measurements = [] } = useQuery({
    queryKey: ['/api/measurements/range'],
    queryParams: { 
      patientId: user?.id, 
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    },
    enabled: !!user?.id,
  });

  const chartData = measurements.map(measurement => ({
    date: format(new Date(measurement.measuredAt), period === 7 ? 'EEE' : 'dd/MM', { locale: fr }),
    systolic: measurement.systolic,
    diastolic: measurement.diastolic,
    pulse: measurement.pulse,
  }));

  return (
    <Card className="medical-card">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Évolution ({period} derniers jours)
          </h3>
          <div className="flex space-x-2">
            <Button 
              size="sm"
              variant={period === 7 ? "default" : "outline"}
              onClick={() => setPeriod(7)}
              className={period === 7 ? "bg-[var(--navy)] text-white" : ""}
            >
              7j
            </Button>
            <Button 
              size="sm"
              variant={period === 30 ? "default" : "outline"}
              onClick={() => setPeriod(30)}
              className={period === 30 ? "bg-[var(--navy)] text-white" : ""}
            >
              30j
            </Button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                domain={[60, 160]}
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="hsl(226, 84%, 32%)" 
                strokeWidth={2}
                name="Systolique"
                dot={{ fill: "hsl(226, 84%, 32%)", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="hsl(188, 95%, 43%)" 
                strokeWidth={2}
                name="Diastolique"
                dot={{ fill: "hsl(188, 95%, 43%)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
