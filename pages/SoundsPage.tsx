import React from 'react';
import { MusicalNoteIcon } from '../constants';

const SoundsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-lg">
      <MusicalNoteIcon className="w-20 h-20 text-sky-blue mb-6" />
      <h1 className="text-3xl font-bold text-night-blue mb-4">Biblioteca de Sonidos Relajantes</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Próximamente: explora una selección de sonidos relajantes, ruido blanco, marrón y paisajes sonoros. Gemini te ayudará a encontrar o crear los sonidos perfectos para tu descanso.
      </p>
      <img src="https://picsum.photos/seed/sounds/600/300" alt="Ondas sonoras abstractas" className="rounded-lg shadow-md"/>
    </div>
  );
};

export default SoundsPage;