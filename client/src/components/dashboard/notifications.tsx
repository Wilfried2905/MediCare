import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { User, Clock, Bell } from "lucide-react";

export default function Notifications() {
  const { user } = useAuth();
  
  const { data: notifications = [] } = useQuery({
    queryKey: ['/api/notifications', user?.id],
    enabled: !!user?.id,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'doctor_message': return <User className="w-4 h-4 text-white" />;
      case 'measurement_reminder': return <Clock className="w-4 h-4 text-white" />;
      default: return <Bell className="w-4 h-4 text-white" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'doctor_message': return 'bg-[var(--navy)]';
      case 'measurement_reminder': return 'bg-[var(--amber-alert)]';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationContainerBg = (type: string) => {
    switch (type) {
      case 'doctor_message': return 'bg-blue-50';
      case 'measurement_reminder': return 'bg-amber-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <Card className="medical-card">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
        
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-xl ${getNotificationContainerBg(notification.type)}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(notification.createdAt), 'dd MMMM, HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Aucune notification</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
