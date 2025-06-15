import React from 'react';
import { PencilSquareIcon } from '../constants';
import Button from '../components/Button';

const LogSleepPage: React.FC = () => {
  // Mock data and handlers for now
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registro de sueño enviado (funcionalidad en desarrollo).");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <PencilSquareIcon className="w-10 h-10 text-calm-green" />
        <h1 className="text-3xl font-bold text-night-blue">Registrar Mi Sueño</h1>
      </div>
      <p className="text-gray-600 mb-6">
        Llevar un registro diario de tu sueño es fundamental para entender tus patrones y para que SerenoIA pueda ayudarte mejor.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="sleepDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input type="date" name="sleepDate" id="sleepDate" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm" />
        </div>
        <div>
          <label htmlFor="bedTime" className="block text-sm font-medium text-gray-700 mb-1">Hora de Acostarse</label>
          <input type="time" name="bedTime" id="bedTime" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm" />
        </div>
        <div>
          <label htmlFor="wakeTime" className="block text-sm font-medium text-gray-700 mb-1">Hora de Levantarse</label>
          <input type="time" name="wakeTime" id="wakeTime" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm" />
        </div>
        <div>
          <label htmlFor="sleepQuality" className="block text-sm font-medium text-gray-700 mb-1">Calidad del Sueño (1-5)</label>
          <select name="sleepQuality" id="sleepQuality" defaultValue="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm">
            <option value="1">1 (Muy Mala)</option>
            <option value="2">2 (Mala)</option>
            <option value="3">3 (Regular)</option>
            <option value="4">4 (Buena)</option>
            <option value="5">5 (Muy Buena)</option>
          </select>
        </div>
        <div>
          <label htmlFor="sleepNotes" className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales (opcional)</label>
          <textarea name="sleepNotes" id="sleepNotes" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm" placeholder="Ej: Me desperté por ruido, tuve un sueño vívido..."></textarea>
        </div>
        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg" className="w-full">Guardar Registro</Button>
        </div>
      </form>
    </div>
  );
};

export default LogSleepPage;