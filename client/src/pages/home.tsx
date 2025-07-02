import { Link } from "wouter";
import { useState } from "react";
import { ChevronDown, Settings } from "lucide-react";
import medicareLogoPath from "@assets/image_1751291643378.png";
import tensiocareLogoPath from "@assets/image_1751291649359.png";
import diabetocareLogoPath from "@assets/image_1751291655837.png";
import consultationsLogoPath from "@assets/image_1751291661472.png";

export default function HomePage() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec bouton Administration */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <div className="relative">
          <button
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className="flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg transition-colors shadow-lg text-sm md:text-base"
          >
            <Settings size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="font-medium hidden sm:inline">Administration</span>
            <span className="font-medium sm:hidden">Admin</span>
            <ChevronDown size={14} className={`md:w-4 md:h-4 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Menu déroulant Administration */}
          {showAdminMenu && (
            <div className="absolute right-0 mt-2 w-56 md:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
              <Link href="/tensiocare-admin-login">
                <div className="px-4 py-3 hover:bg-teal-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Admin TensioCare</div>
                      <div className="text-sm text-gray-500">Gestion tension artérielle</div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/diabetocare-admin-login">
                <div className="px-4 py-3 hover:bg-red-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Admin DiabetoCare</div>
                      <div className="text-sm text-gray-500">Gestion diabète</div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/consultations-admin-login">
                <div className="px-4 py-3 hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Admin Consultations</div>
                      <div className="text-sm text-gray-500">Gestion consultations</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen">
        
        {/* Section principale avec logo MediCare */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-12 bg-white py-4">
          {/* Logo MediCare+ - responsive */}
          <div className="text-center mb-1">
            <img 
              src={medicareLogoPath} 
              alt="MediCare+ Logo" 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto mx-auto"
              style={{
                clipPath: 'inset(8% 10% 8% 10%)',
              }}
            />
          </div>

          {/* Texte descriptif - responsive */}
          <div className="text-center max-w-xs sm:max-w-xl md:max-w-2xl mb-4 md:mb-6">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-1 md:mb-2">
              Votre plateforme centrale de santé digitale qui connecte tous vos services médicaux en un seul endroit.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Accédez facilement à{" "}
              <span className="text-teal-500 font-semibold">TensioCare</span>{" "}
              pour votre tension,{" "}
              <span className="text-red-500 font-semibold">DiabetoCare</span>{" "}
              pour votre diabète, et{" "}
              <span className="text-green-500 font-semibold">Consultations</span>{" "}
              pour vos rendez-vous médicaux
            </p>
          </div>

          {/* Services - layout responsive */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-xs sm:max-w-3xl md:max-w-4xl">
            
            {/* TensioCare */}
            <Link href="/login">
              <div className="group cursor-pointer w-full sm:flex-1 max-w-xs">
                <div className="hover:bg-teal-50 transition-all duration-300 p-2 sm:p-3 md:p-4 rounded-2xl">
                  <img 
                    src={tensiocareLogoPath} 
                    alt="TensioCare" 
                    className="w-full h-20 sm:h-24 md:h-32 object-contain"
                  />
                </div>
              </div>
            </Link>

            {/* DiabetoCare */}
            <Link href="/diabetocare-login">
              <div className="group cursor-pointer w-full sm:flex-1 max-w-xs">
                <div className="hover:bg-red-50 transition-all duration-300 p-2 sm:p-3 md:p-4 rounded-2xl">
                  <img 
                    src={diabetocareLogoPath} 
                    alt="DiabetoCare" 
                    className="w-full h-20 sm:h-24 md:h-32 object-contain"
                  />
                </div>
              </div>
            </Link>

            {/* Consultations */}
            <Link href="/consultations-login">
              <div className="group cursor-pointer w-full sm:flex-1 max-w-xs">
                <div className="hover:bg-green-50 transition-all duration-300 p-2 sm:p-3 md:p-4 rounded-2xl">
                  <img 
                    src={consultationsLogoPath} 
                    alt="Consultations" 
                    className="w-full h-20 sm:h-24 md:h-32 object-contain"
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