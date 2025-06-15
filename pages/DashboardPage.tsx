import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { SparklesIcon, MoonIcon, PencilSquareIcon, ChartBarIcon } from '../constants';
import { useUser } from '../contexts/UserContext';

const DashboardPage: React.FC = () => {
  const { sleepProfile } = useUser();

  const quickLinks = [
    { to: '/assessment', icon: <SparklesIcon className="w-8 h-8 text-night-blue" />, label: 'Iniciar Evaluación IA', description: 'Descubre tu perfil de sueño personalizado.' },
    { to: '/log-sleep', icon: <PencilSquareIcon className="w-8 h-8 text-night-blue" />, label: 'Registrar Sueño', description: 'Lleva un diario de tus noches.' },
    { to: '/my-plan', icon: <MoonIcon className="w-8 h-8 text-night-blue" />, label: 'Mi Plan de Sueño', description: 'Accede a tus estrategias personalizadas.' },
    { to: '/insights', icon: <ChartBarIcon className="w-8 h-8 text-night-blue" />, label: 'Ver Análisis', description: 'Observa tus patrones y progreso.' },
  ];

  return (
    <div className="space-y-8">
      <div className="p-8 bg-gradient-to-r from-night-blue to-deep-ocean text-white rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-3">Bienvenido a SerenoIA</h1>
        <p className="text-lg text-light-lavender/90 mb-6">Tu guía personalizada para un descanso reparador. Comienza tu viaje hacia un mejor sueño hoy mismo.</p>
        {!sleepProfile && (
          <Link to="/assessment">
            <Button variant="secondary" size="lg" leftIcon={<SparklesIcon className="w-5 h-5"/>}>
              Comenzar Evaluación de Sueño
            </Button>
          </Link>
        )}
      </div>

      {sleepProfile && (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-calm-green/50">
          <h2 className="text-2xl font-semibold text-night-blue mb-3">Tu Perfil de Sueño Resumido</h2>
          <p className="text-gray-700 mb-2"><strong className="font-medium">Cronotipo:</strong> {sleepProfile.chronotype}</p>
          <p className="text-gray-700 mb-4"><strong className="font-medium">Resumen:</strong> {sleepProfile.summary}</p>
          <Link to="/my-plan">
            <Button variant="primary">Ver Mi Plan Completo</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickLinks.map(link => (
          <Link key={link.to} to={link.to} className="block group">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 h-full flex flex-col">
              <div className="flex items-center space-x-4 mb-3">
                {link.icon}
                <h3 className="text-xl font-semibold text-night-blue group-hover:text-deep-ocean transition-colors">{link.label}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{link.description}</p>
              <span className="mt-4 text-sm text-sky-blue font-medium group-hover:underline">Acceder →</span>
            </div>
          </Link>
        ))}
      </div>
       <div className="mt-8 p-6 bg-light-lavender/60 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-night-blue mb-3">Consejo del Día</h3>
        <p className="text-gray-700">
          Mantén un horario de sueño regular, incluso los fines de semana, para ayudar a regular tu reloj biológico.
          <Link to="/learn" className="text-sky-blue hover:underline ml-2">Aprende más...</Link>
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;