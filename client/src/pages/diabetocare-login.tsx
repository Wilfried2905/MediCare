import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { User, Stethoscope, Settings, Heart, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import diabetoCareLogo from "@assets/image_1751302926073.png";

export default function DiabetoCareLogin() {
  const { login, isLoading, user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  // Rediriger si déjà connecté selon le rôle
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "patient":
          setLocation('/diabetocare-patient-dashboard');
          break;
        case "medecin":
        case "doctor":
          setLocation('/diabetocare-doctor-dashboard');
          break;
        case "admin":
          setLocation('/diabetocare-admin-dashboard');
          break;
        default:
          setLocation('/diabetocare-patient-dashboard');
      }
    }
  }, [user, setLocation]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const profiles = [
    {
      id: 'patient',
      name: 'Patient',
      icon: User,
      color: 'bg-red-100 text-red-600 border-red-200',
      selectedColor: 'bg-red-600 text-white border-red-600'
    },
    {
      id: 'medecin',
      name: 'Diabétologue',
      icon: Stethoscope,
      color: 'bg-red-100 text-red-600 border-red-200',
      selectedColor: 'bg-red-600 text-white border-red-600'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      // La redirection est gérée par useEffect
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileSelect = (profileId: string, username: string, password: string) => {
    setSelectedProfile(profileId);
    setFormData(prev => ({
      ...prev,
      username,
      password
    }));
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Bouton Retour à l'accueil - responsive */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-1 md:gap-2 bg-white/90 hover:bg-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-2">
            <ArrowLeft size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
            <span className="sm:hidden">Retour</span>
          </Button>
        </Link>
      </div>
      
      {/* Section gauche - Image médicale */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-100 to-red-200 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <img 
            src={diabetoCareLogo} 
            alt="DiabetoCare - Suivi du diabète" 
            className="w-full h-auto rounded-2xl shadow-2xl mb-8"
          />
          <h2 className="text-3xl font-bold text-red-800 mb-4">
            DiabetoCare
          </h2>
          <p className="text-red-700 text-lg leading-relaxed">
            Votre plateforme de suivi du diabète et de télémédecine spécialisée. 
            Gérez votre glycémie, consultez vos diabétologues et optimisez votre traitement.
          </p>
        </div>
      </div>

      {/* Section droite - Formulaire de connexion */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo et titre pour mobile */}
          <div className="text-center lg:hidden mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-red-700">DiabetoCare</h1>
            <p className="text-gray-600">Connexion à votre espace</p>
          </div>

          {/* Titre principal pour desktop */}
          <div className="hidden lg:block text-center">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
            <p className="text-gray-600">Accédez à votre espace DiabetoCare</p>
          </div>

          {/* Sélection rapide du profil */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Connexion rapide</Label>
            <div className="grid grid-cols-2 gap-6">
              {profiles.map((profile) => {
                const Icon = profile.icon;
                const isSelected = selectedProfile === profile.id;
                
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => handleProfileSelect(profile.id, profile.id, profile.id)}
                    className={`p-3 border-2 rounded-lg transition-all duration-200 ${
                      isSelected ? profile.selectedColor : profile.color
                    } hover:scale-105`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-medium">{profile.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center">
              Cliquez sur un profil pour une connexion rapide (demo)
            </p>
          </div>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou connectez-vous manuellement</span>
            </div>
          </div>

          {/* Formulaire de connexion */}
          <Card className="border-red-200">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Nom d'utilisateur
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                    className="border-red-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Se souvenir de moi
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de démonstration */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-800 mb-2">Comptes de démonstration :</h3>
            <div className="space-y-1 text-sm text-red-700">
              <p><strong>Patient :</strong> patient / patient</p>
              <p><strong>Diabétologue :</strong> medecin / medecin</p>
              <p><strong>Administrateur :</strong> admin / admin</p>
            </div>
          </div>

          {/* Lien retour */}
          <div className="text-center">
            <button
              onClick={() => setLocation('/')}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              ← Retour à l'accueil MediCare+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}