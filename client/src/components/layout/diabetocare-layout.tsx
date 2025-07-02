import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import DiabetoCareSidebar from "./diabetocare-sidebar";
import DiabetoCareDoctorSidebar from "./diabetocare-doctor-sidebar";
import DiabetoCareAdminSidebar from "./diabetocare-admin-sidebar";

interface DiabetoCareLayoutProps {
  children: ReactNode;
}

export default function DiabetoCareLayout({ children }: DiabetoCareLayoutProps) {
  const { user } = useAuth();

  const renderSidebar = () => {
    if (!user) return <DiabetoCareSidebar />;
    
    switch (user.role) {
      case "patient":
        return <DiabetoCareSidebar />;
      case "doctor":
      case "medecin":
        return <DiabetoCareDoctorSidebar />;
      case "admin":
        return <DiabetoCareAdminSidebar />;
      default:
        return <DiabetoCareSidebar />;
    }
  };

  return (
    <div className="flex h-screen bg-red-50">
      {renderSidebar()}
      <main className="flex-1 overflow-auto ml-0 md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}