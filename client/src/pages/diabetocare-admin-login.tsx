import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "wouter";
import { Shield, Activity, ArrowLeft } from "lucide-react";

export default function DiabetoCareAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.user.role === "admin") {
        localStorage.setItem("user", JSON.stringify(data.user));
        // Force reload pour que le contexte d'auth soit mis à jour
        window.location.href = "/diabetocare-admin-dashboard";
      } else if (response.ok && data.user.role !== "admin") {
        setError("Accès réservé aux administrateurs DiabetoCare");
      } else {
        setError(data.error || "Identifiants incorrects");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <Button
          variant="ghost"
          className="mb-4 text-red-600 hover:text-red-700"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Administration DiabetoCare
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Espace réservé aux administrateurs
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nom d'utilisateur administrateur
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Mot de passe administrateur
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Accéder au Dashboard Admin"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800 text-center">
                <Shield className="w-4 h-4 inline mr-1" />
                Accès sécurisé à l'administration DiabetoCare
              </p>
              <p className="text-xs text-red-600 text-center mt-1">
                Gestion des patients diabétiques et surveillance glycémique
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}