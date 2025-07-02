import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Activity, 
  Pill, 
  CreditCard,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import logoPath from "@assets/cfimages_1750859976257.avif";
import { Button } from "@/components/ui/button";

const getNavigationForRole = (role: string) => {
  const baseNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  if (role === 'patient') {
    return [
      ...baseNavigation,
      { name: 'Mes Mesures', href: '/measurements', icon: Activity },
      { name: 'Médicaments', href: '/medications', icon: Pill },
      { name: 'Messagerie', href: '/messages', icon: MessageSquare },
      { name: 'Abonnement', href: '/subscription', icon: CreditCard },
    ];
  }

  if (role === 'medecin') {
    return [
      ...baseNavigation,
      { name: 'Mes Patients', href: '/patients', icon: User },
      { name: 'Consultations', href: '/consultations', icon: Activity },
      { name: 'Messagerie', href: '/messages', icon: MessageSquare },
      { name: 'Prescriptions', href: '/prescriptions', icon: Pill },
      { name: 'Rapports', href: '/reports', icon: CreditCard },
    ];
  }

  if (role === 'admin') {
    return [
      ...baseNavigation,
      { name: 'Utilisateurs', href: '/users', icon: User },
      { name: 'Abonnements', href: '/subscriptions', icon: CreditCard },
      { name: 'Paiements', href: '/payments', icon: Activity },
      { name: 'Statistiques', href: '/statistiques', icon: LayoutDashboard },
    ];
  }

  return baseNavigation;
};

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getUserTypeDisplay = (role: string) => {
    switch (role) {
      case 'patient': return 'Patient';
      case 'medecin': return 'Médecin';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Desktop (always visible) and Mobile (conditional) */}
      <nav className={cn(
        "fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300",
        "md:translate-x-0", // Always visible on desktop
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full" // Mobile slide in/out
      )}>
      <div className="p-2">
        <div className="flex flex-col items-center mb-4">
          <Link href="/login" className="cursor-pointer hover:opacity-90 transition-opacity">
            <img src={logoPath} alt="TensioCare" className="w-full h-48 md:h-64 object-contain mb-2" />
          </Link>
          <p className="text-xs md:text-sm text-gray-500 font-medium">{getUserTypeDisplay(user.role)}</p>
        </div>
        
        {/* Navigation Menu */}
        <ul className="space-y-2 mb-4 px-4">
          {getNavigationForRole(user.role).map((item) => {
            const isActive = location === item.href || (location === '/' && item.href === '/dashboard');
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className={cn(
                    "nav-item",
                    isActive ? "active" : ""
                  )}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-[var(--light-blue)] rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--navy)] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getUserInitials(user.firstName, user.lastName)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-600">Abonnement Actif</p>
              </div>
            </div>
            <Button 
              onClick={() => {
                logout();
                setLocation("/");
              }}
              variant="ghost" 
              className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 justify-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
}
