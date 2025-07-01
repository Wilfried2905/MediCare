import { Link } from "wouter";
import medicareLogoPath from "@assets/image_1751291643378.png";
import tensiocareLogoPath from "@assets/image_1751291649359.png";
import diabetocareLogoPath from "@assets/image_1751291655837.png";
import consultationsLogoPath from "@assets/image_1751291661472.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full h-screen">
        
        {/* Section gauche - Contenu principal */}
        <div className="flex-1 flex flex-col justify-center items-center px-20 bg-white">
          {/* Logo MediCare+ EXACT depuis votre image - taille augmentée */}
          <div className="text-center mb-6">
            <img 
              src={medicareLogoPath} 
              alt="MediCare+ Logo" 
              className="w-full max-w-2xl h-auto mx-auto"
              style={{
                clipPath: 'inset(8% 10% 8% 10%)', // Recadrer pour avoir juste le logo + texte + descriptions
              }}
            />
          </div>

          {/* Texte descriptif additionnel */}
          <div className="text-center max-w-3xl">
            <p className="text-lg text-gray-600 leading-relaxed">
              Votre plateforme centrale de santé digitale qui connecte tous vos services médicaux en un seul endroit.
            </p>
            <br />
            <p className="text-lg text-gray-600 leading-relaxed">
              Accédez facilement à{" "}
              <span className="text-teal-500 font-semibold">TensioCare</span>{" "}
              pour votre tension,{" "}
              <span className="text-red-500 font-semibold">DiabetoCare</span>{" "}
              pour votre diabète, et{" "}
              <span className="text-green-500 font-semibold">Consultations</span>{" "}
              pour vos rendez-vous médicaux
            </p>
          </div>
        </div>

        {/* Ligne de séparation verticale */}
        <div className="w-px bg-gray-300"></div>

        {/* Section droite - Services */}
        <div className="flex-1 flex flex-col justify-center items-center px-20 bg-white">
          <div className="space-y-8 w-full max-w-xs">
            
            {/* TensioCare - Actif */}
            <Link href="/login">
              <div className="group cursor-pointer">
                <div className="hover:bg-teal-50 transition-all duration-300 p-2 rounded-2xl">
                  <img 
                    src={tensiocareLogoPath} 
                    alt="TensioCare" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Link>

            {/* DiabetoCare - Actif */}
            <Link href="/diabetocare-login">
              <div className="group cursor-pointer">
                <div className="hover:bg-red-50 transition-all duration-300 p-2 rounded-2xl">
                  <img 
                    src={diabetocareLogoPath} 
                    alt="DiabetoCare" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Link>

            {/* Consultations - Actif */}
            <Link href="/consultations-login">
              <div className="group cursor-pointer">
                <div className="hover:bg-teal-50 transition-all duration-300 p-2 rounded-2xl">
                  <img 
                    src={consultationsLogoPath} 
                    alt="Consultations" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}