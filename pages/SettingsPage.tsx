import React from 'react';
import { CogIcon, ExclamationCircleIcon } from '../constants';
import { useUser } from '../contexts/UserContext';

const SettingsPage: React.FC = () => {
  const { apiKeyPresent } = useUser();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <CogIcon className="w-10 h-10 text-night-blue" />
          <h1 className="text-3xl font-bold text-night-blue">Ajustes de SerenoIA</h1>
        </div>

        {(!apiKeyPresent && !process.env.API_KEY) && ( // Added check for process.env.API_KEY as well for robustness
             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <div className="flex items-center">
                    <ExclamationCircleIcon className="w-6 h-6 mr-2"/>
                    <p className="font-semibold">Configuración Requerida:</p>
                </div>
                <p>La API Key de Gemini no está configurada en el entorno de esta aplicación.
                Las funcionalidades principales que dependen de la IA no estarán disponibles.
                Por favor, asegúrate de que la variable de entorno <code>API_KEY</code> esté correctamente establecida para el servicio de Gemini.
                </p>
            </div>
        )}
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-night-blue border-b pb-2">Recordatorios y Alarmas</h2>
          <p className="text-gray-600">
            Próximamente: configura recordatorios para tu rutina de sueño y alarmas inteligentes optimizadas por Gemini.
          </p>
          <div className="p-4 bg-gray-100 rounded-md text-center text-gray-500">
            (Configuración de recordatorios y alarmas aquí)
          </div>

          <h2 className="text-xl font-semibold text-night-blue border-b pb-2">Preferencias de Perfil</h2>
          <p className="text-gray-600">
            Próximamente: ajusta tus datos personales y preferencias para una experiencia más personalizada.
          </p>
           <div className="p-4 bg-gray-100 rounded-md text-center text-gray-500">
            (Ajustes de perfil aquí)
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;