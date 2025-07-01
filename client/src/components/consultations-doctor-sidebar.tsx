import { useLocation } from "wouter";
import { 
  Home, 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  FileText, 
  User, 
  LogOut,
  Heart,
  BarChart3,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsultationsDoctorSidebarProps {
  onLogout?: () => void;
}

export default function ConsultationsDoctorSidebar({ onLogout }: ConsultationsDoctorSidebarProps) {
  const [location, setLocation] = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/consultations-doctor-dashboard",
      active: location === "/consultations-doctor-dashboard"
    },
    {
      icon: Calendar,
      label: "Planning",
      path: "/consultations-doctor-schedule",
      active: location === "/consultations-doctor-schedule"
    },
    {
      icon: Users,
      label: "Mes patients",
      path: "/consultations-doctor-patients",
      active: location === "/consultations-doctor-patients"
    },
    {
      icon: Clock,
      label: "Consultations",
      path: "/consultations-doctor-consultation",
      active: location === "/consultations-doctor-consultation"
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/consultations-doctor-messages",
      active: location === "/consultations-doctor-messages"
    },
    {
      icon: FileText,
      label: "Prescriptions",
      path: "/consultations-doctor-prescriptions",
      active: location === "/consultations-doctor-prescriptions"
    },
    {
      icon: BarChart3,
      label: "Statistiques",
      path: "/consultations-doctor-stats",
      active: location === "/consultations-doctor-stats"
    },
    {
      icon: User,
      label: "Mon profil",
      path: "/consultations-doctor-profile",
      active: location === "/consultations-doctor-profile"
    }
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-gray-900">Consultations</h1>
            <p className="text-sm text-green-600 font-medium">Espace Médecin</p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}