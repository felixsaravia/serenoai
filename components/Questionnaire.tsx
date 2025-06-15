import React, { useState, ChangeEvent, FormEvent } from 'react';
import { QuestionnaireAnswers, Question } from '../types';
import Button from './Button';
import { DEFAULT_CHRONOTYPE_OPTIONS } from '../constants';

interface QuestionnaireProps {
  questions: Question[];
  onSubmit: (answers: QuestionnaireAnswers) => void;
  isLoading: boolean;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, onSubmit, isLoading }) => {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
      processedValue = value === '' ? '' : parseFloat(value);
    } else if (e.target instanceof HTMLInputElement && type === 'checkbox') {
        // Example for checkbox, not used in current questions but good to have
        // processedValue = e.target.checked; 
    }

    setAnswers(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      {questions.map((q, index) => (
        <div key={q.id} className="p-4 border-b border-gray-100 last:border-b-0">
          <label htmlFor={q.id} className="block text-lg font-medium text-night-blue mb-2">
            {index + 1}. {q.text}
          </label>
          {q.type === 'text' && (
            <input
              type="text"
              id={q.id}
              name={q.id}
              value={answers[q.id] as string || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm transition-colors"
              required
            />
          )}
          {q.type === 'number' && (
            <input
              type="number"
              id={q.id}
              name={q.id}
              value={answers[q.id] as number || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm transition-colors"
              required
            />
          )}
          {q.type === 'select' && q.options && (
            <select
              id={q.id}
              name={q.id}
              value={answers[q.id] as string || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-sky-blue focus:border-sky-blue sm:text-sm transition-colors"
              required
            >
              <option value="" disabled>Selecciona una opción</option>
              {q.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <div className="pt-6 flex justify-end">
        <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
          {isLoading ? 'Analizando...' : 'Obtener Perfil de Sueño'}
        </Button>
      </div>
    </form>
  );
};

export const sampleQuestions: Question[] = [
  { id: 'usualBedtime', text: '¿A qué hora sueles acostarte en días de semana?', type: 'text', }, // e.g., "11:00 PM"
  { id: 'usualWakeTime', text: '¿A qué hora sueles despertarte en días de semana?', type: 'text' }, // e.g., "7:00 AM"
  { id: 'timeToFallAsleep', text: '¿Cuánto tiempo (en minutos) tardas aproximadamente en dormirte una vez que te acuestas?', type: 'number' },
  { id: 'nightAwakenings', text: '¿Cuántas veces te despiertas durante la noche, en promedio?', type: 'number' },
  { id: 'sleepQuality', text: 'En una escala del 1 (muy mala) al 5 (muy buena), ¿cómo calificarías la calidad general de tu sueño?', type: 'select', options: ['1', '2', '3', '4', '5'] },
  { id: 'daytimeTiredness', text: 'En una escala del 1 (nada cansado) al 5 (muy cansado), ¿qué tan cansado te sientes durante el día?', type: 'select', options: ['1', '2', '3', '4', '5'] },
  { id: 'mainSleepProblem', text: 'Describe brevemente tu principal problema o preocupación sobre el sueño.', type: 'text' },
  { id: 'chronotypePreference', text: '¿Te consideras más una persona mañanera, nocturna o intermedia?', type: 'select', options: DEFAULT_CHRONOTYPE_OPTIONS },
];


export default Questionnaire;