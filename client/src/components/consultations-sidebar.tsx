import { useLocation } from "wouter";
import { 
  Home, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsultationsSidebarProps {
  onLogout?: () => void;
}

export default function ConsultationsSidebar({ onLogout }: ConsultationsSidebarProps) {
  const [location, setLocation] = useLocation();

  const menuItems = [
    {
      title: "Accueil",
      icon: Home,
      path: "/consultations-patient-dashboard",
      description: "Dashboard principal"
    },
    {
      title: "Prendre RDV",
      icon: Calendar,
      path: "/consultations-book-appointment", 
      description: "Réserver une consultation"
    },
    {
      title: "Mes RDV",
      icon: Clock,
      path: "/consultations-appointments-list",
      description: "Liste des rendez-vous"
    },
    {
      title: "RDV Urgence",
      icon: AlertTriangle,
      path: "/consultations-emergency-appointment",
      description: "Consultation d'urgence"
    },
    {
      title: "Dossier médical",
      icon: FileText,
      path: "/consultations-medical-record",
      description: "Historique médical"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/consultations-messages",
      description: "Communication médecin"
    },
    {
      title: "Mon profil",
      icon: User,
      path: "/consultations-profile",
      description: "Informations personnelles"
    }
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 z-30">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Consultations</h2>
              <p className="text-sm text-gray-500">Menu Patient</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? "bg-blue-100 text-blue-900 border-l-4 border-blue-500" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-orange-600" : "text-gray-500"}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${isActive ? "text-orange-900" : "text-gray-900"}`}>
                      {item.title}
                    </p>
                    <p className={`text-xs ${isActive ? "text-orange-700" : "text-gray-500"}`}>
                      {item.description}
                    </p>
                  </div>
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