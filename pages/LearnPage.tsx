import React from 'react';
import { BookOpenIcon } from '../constants';

const LearnPage: React.FC = () => {
  const articles = [
    { title: "La Importancia de la Higiene del Sueño", summary: "Descubre hábitos clave para mejorar tu descanso nocturno.", image: "https://picsum.photos/seed/higiene/300/200" },
    { title: "¿Qué es un Cronotipo y Cómo Afecta tu Sueño?", summary: "Entiende tu reloj biológico interno y cómo adaptarte a él.", image: "https://picsum.photos/seed/cronotipo/300/200" },
    { title: "TCC-I: Terapia Cognitivo-Conductual para el Insomnio", summary: "Una introducción a la terapia más efectiva para el insomnio crónico.", image: "https://picsum.photos/seed/tcci/300/200" },
  ];

  return (
    <div className="space-y-6">
      <div className="p-8 bg-gradient-to-r from-sky-blue/70 to-calm-green/70 text-white rounded-xl shadow-2xl">
        <div className="flex items-center space-x-3 mb-2">
            <BookOpenIcon className="w-10 h-10 text-night-blue"/>
            <h1 className="text-4xl font-bold text-night-blue">Aprende Sobre el Sueño</h1>
        </div>
        <p className="text-lg text-night-blue/80">Información basada en la ciencia para ayudarte a entender y mejorar tu descanso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-night-blue mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{article.summary}</p>
              <button className="mt-auto text-sm text-sky-blue font-medium hover:underline self-start">Leer más (Próximamente)</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-night-blue mb-4">Preguntas Frecuentes (con IA)</h2>
        <p className="text-gray-600 mb-4">
          Próximamente: ¿Tienes preguntas específicas sobre el sueño? Gemini te proporcionará respuestas concisas y basadas en la evidencia.
        </p>
        <div className="flex">
            <input type="text" placeholder="Escribe tu pregunta aquí..." className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-sky-blue focus:border-sky-blue" />
            <button className="px-4 py-2 bg-night-blue text-white rounded-r-lg hover:bg-opacity-90">Preguntar a IA</button>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;