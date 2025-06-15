import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Button from '../components/Button';
import { MoonIcon, SparklesIcon } from '../constants';

const MyPlanPage: React.FC = () => {
  const { sleepProfile } = useUser();

  if (!sleepProfile) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <MoonIcon className="w-16 h-16 text-sky-blue mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-night-blue mb-3">Aún no tienes un plan de sueño.</h2>
        <p className="text-gray-600 mb-6">
          Realiza la evaluación de sueño para generar tu plan personalizado y comenzar a mejorar tus noches.
        </p>
        <Link to="/assessment">
          <Button variant="primary" size="lg" leftIcon={<SparklesIcon className="w-5 h-5"/>}>
            Iniciar Evaluación de Sueño
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-8 bg-gradient-to-r from-night-blue to-deep-ocean text-white rounded-xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-2">
            <MoonIcon className="w-10 h-10"/>
            <h1 className="text-4xl font-bold">Mi Plan de Sueño Personalizado</h1>
        </div>
        <p className="text-lg text-light-lavender/90">Aquí encontrarás las estrategias y recomendaciones de SerenoIA para ti.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-night-blue mb-4">Resumen de tu Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong className="font-medium">Cronotipo:</strong> <span className="text-sky-blue font-semibold">{sleepProfile.chronotype}</span></p>
        </div>
        <p className="mt-3"><strong className="font-medium">Diagnóstico IA:</strong> {sleepProfile.summary}</p>
      </div>

      {sleepProfile.recommendations && sleepProfile.recommendations.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-night-blue mb-4">Recomendaciones Clave</h2>
          <ul className="space-y-3 list-disc list-inside pl-2 text-gray-700">
            {sleepProfile.recommendations.map((rec, index) => (
              <li key={index} className="pb-2 border-b border-gray-100 last:border-b-0">
                {rec.includes(':') ? (
                  <>
                    <span className="font-medium text-night-blue/80">{rec.split(':')[0]}:</span> {rec.substring(rec.indexOf(':') + 1).trim()}
                  </>
                ) : (
                  rec
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-night-blue mb-4">Próximos Pasos</h2>
        <p className="text-gray-700 mb-4">
          SerenoIA te guiará con técnicas de higiene del sueño, control de estímulos y, si es necesario, restricción del sueño.
          Registra tu sueño diariamente para que la IA pueda ajustar tu plan.
        </p>
        <div className="flex space-x-4">
            <Link to="/log-sleep"><Button variant="primary">Registrar Sueño Hoy</Button></Link>
            <Link to="/learn"><Button variant="secondary">Aprender Más Sobre el Sueño</Button></Link>
        </div>
      </div>
       <div className="mt-8 p-4 bg-calm-green/20 rounded-xl text-center">
        <p className="text-sm text-night-blue">
            Recuerda: la consistencia es clave. Estamos aquí para ayudarte en cada paso.
        </p>
      </div>
    </div>
  );
};

export default MyPlanPage;