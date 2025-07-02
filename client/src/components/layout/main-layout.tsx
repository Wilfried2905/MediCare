import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
