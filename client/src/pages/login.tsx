import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { User, Stethoscope, Settings, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import logoPath from "@assets/cfimages_1750859976257.avif";
// Direct URL to the image

export default function Login() {
  const { login, isLoading, user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      setLocation('/dashboard');
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
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      selectedColor: 'bg-blue-600 text-white border-blue-600'
    },
    {
      id: 'medecin',
      name: 'Médecin',
      icon: Stethoscope,
      color: 'bg-teal-100 text-teal-600 border-teal-200',
      selectedColor: 'bg-teal-600 text-white border-teal-600'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.username, formData.password);
  };

  const handleInputChange = (field: string) => (value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    setFormData(prev => ({ ...prev, username: profileId, password: profileId }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col lg:flex-row">
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
      
      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-0 relative overflow-hidden">
        <img 
          src="/hero-image.jpeg" 
          alt="TensioCare Medical Interface" 
          className="w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
        />
      </div>

      {/* Right side - Login form (full width on mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue</h1>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              TensioCare est votre solution complète de télésurveillance<br/>
              de la tension artérielle pour un suivi médical personnalisé.
            </p>
          </div>

          {/* Profile Selection */}
          <div className="mb-8">
            <p className="text-gray-700 text-sm font-medium mb-4 text-center">
              Sélectionnez votre profil pour vous connecter
            </p>
            <div className="grid grid-cols-2 gap-6">
              {profiles.map((profile) => {
                const IconComponent = profile.icon;
                const isSelected = selectedProfile === profile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => handleProfileSelect(profile.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                      isSelected ? profile.selectedColor : profile.color
                    } hover:scale-105`}
                  >
                    <IconComponent className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-xs font-medium">{profile.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedProfile && (
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                      Nom d'utilisateur
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder={selectedProfile}
                      value={formData.username}
                      onChange={(e) => handleInputChange('username')(e.target.value)}
                      className="mt-2 h-12 border-gray-300 focus:border-[var(--navy)] focus:ring-[var(--navy)]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password')(e.target.value)}
                      className="mt-2 h-12 border-gray-300 focus:border-[var(--navy)] focus:ring-[var(--navy)]"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange('rememberMe')(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Se souvenir de moi
                      </Label>
                    </div>
                    <button type="button" className="text-sm text-[var(--navy)] hover:text-[var(--navy)]/80">
                      Mot de passe oublié?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white font-medium text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
