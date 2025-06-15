import React from 'react';
import { BookOpenIcon } from '../constants';

const MindfulnessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-lg">
      <BookOpenIcon className="w-20 h-20 text-calm-green mb-6" />
      <h1 className="text-3xl font-bold text-night-blue mb-4">Técnicas de Aceptación y Mindfulness</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Próximamente: accede a meditaciones guiadas y ejercicios de mindfulness para ayudarte a gestionar los pensamientos y sentimientos relacionados con el sueño. Gemini podrá generar contenido adaptado a tus necesidades.
      </p>
      <img src="https://picsum.photos/seed/mindfulness/600/300" alt="Paisaje relajante" className="rounded-lg shadow-md"/>
    </div>
  );
};

export default MindfulnessPage;