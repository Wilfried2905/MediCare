import { Link, useLocation } from "wouter";
import { Activity, Droplets, Pill, MessageSquare, CreditCard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { cn } from "@/lib/utils";
import diabetoCareLogoPath from "@assets/image_1751302926073.png";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/diabetocare-patient-dashboard",
    icon: Activity,
  },
  {
    name: "Mes Mesures",
    href: "/diabetocare-measurements", 
    icon: Droplets,
  },
  {
    name: "Médicaments",
    href: "/diabetocare-medications",
    icon: Pill,
  },
  {
    name: "Messagerie",
    href: "/diabetocare-messages",
    icon: MessageSquare,
  },
  {
    name: "Abonnement",
    href: "/diabetocare-subscription",
    icon: CreditCard,
  },
];

export default function DiabetoCareSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg border-red-200"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white shadow-lg h-screen w-64 fixed left-0 top-0 overflow-y-auto border-r border-gray-200 z-40 transform transition-transform duration-300",
        "md:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/diabetocare-login">
          <div className="flex items-center gap-3">
            <img 
              src={diabetoCareLogoPath} 
              alt="DiabetoCare Logo" 
              className="h-12 w-12 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
            <span className="text-xl font-bold text-red-600">DiabetoCare</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3">
          {navigationItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${
                    isActive
                      ? "bg-red-100 text-red-700 border-l-4 border-red-500"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </Button>
      </div>
      </div>
    </>
  );
}