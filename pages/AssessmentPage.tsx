import React, { useState } from 'react';
import Questionnaire, { sampleQuestions } from '../components/Questionnaire';
import { analyzeSleepQuestionnaire } from '../services/geminiService';
import { QuestionnaireAnswers, SleepProfile } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useUser } from '../contexts/UserContext';
import Button from '../components/Button';
import { CheckCircleIcon, ExclamationCircleIcon, SparklesIcon }  from '../constants';

const AssessmentPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const { sleepProfile, setSleepProfile, apiKeyPresent } = useUser();

  const handleSubmit = async (answers: QuestionnaireAnswers) => {
    if (!apiKeyPresent && !process.env.API_KEY) { // Double check, though geminiService will also check
      setError("La API Key de Gemini no está configurada. Por favor, contacta al administrador o configura la API Key para usar esta función.");
      setShowResultModal(true); // Show error in modal
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const profile = await analyzeSleepQuestionnaire(answers);
      setSleepProfile(profile);
      setShowResultModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
      setShowResultModal(true); // Show modal also for error
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileDetails = (profile: SleepProfile) => (
    <div className="space-y-4 text-gray-700">
      <div>
        <h3 className="font-semibold text-night-blue text-lg">Resumen General:</h3>
        <p>{profile.summary}</p>
      </div>
      <div>
        <h3 className="font-semibold text-night-blue text-lg">Patrones Identificados:</h3>
        {profile.identifiedPatterns && profile.identifiedPatterns.length > 0 ? (
          <ul className="list-disc list-inside ml-4">
            {profile.identifiedPatterns.map((pattern, i) => <li key={i}>{pattern}</li>)}
          </ul>
        ) : <p>No se identificaron patrones específicos.</p>}
      </div>
      <div>
        <h3 className="font-semibold text-night-blue text-lg">Posibles Causas de Insomnio:</h3>
         {profile.possibleInsomniaCauses && profile.possibleInsomniaCauses.length > 0 ? (
          <ul className="list-disc list-inside ml-4">
            {profile.possibleInsomniaCauses.map((cause, i) => <li key={i}>{cause}</li>)}
          </ul>
        ) : <p>No se identificaron causas obvias de insomnio.</p>}
      </div>
      <div>
        <h3 className="font-semibold text-night-blue text-lg">Cronotipo Estimado:</h3>
        <p className="text-sky-blue font-bold text-xl">{profile.chronotype}</p>
      </div>
       {profile.recommendations && profile.recommendations.length > 0 && (
        <div>
            <h3 className="font-semibold text-night-blue text-lg">Recomendaciones Iniciales:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
                {profile.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
        </div>
        )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 border border-sky-blue/30">
        <div className="flex items-center space-x-3 mb-4">
            <SparklesIcon className="w-10 h-10 text-sky-blue"/>
            <h1 className="text-3xl font-bold text-night-blue">Evaluación de Sueño con IA</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Responde a estas preguntas para que SerenoIA analice tus hábitos de sueño y te proporcione un perfil personalizado. 
          Este es el primer paso hacia un descanso reparador.
        </p>
      </div>

      {!apiKeyPresent && !process.env.API_KEY && (
         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <div className="flex items-center">
                <ExclamationCircleIcon className="w-6 h-6 mr-2"/>
                <p className="font-semibold">Funcionalidad Limitada:</p>
            </div>
            <p>La API Key de Gemini no está configurada. La evaluación de sueño no funcionará hasta que se configure.</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner text="Analizando tus respuestas con IA..." size="lg" />
        </div>
      ) : (
        <Questionnaire questions={sampleQuestions} onSubmit={handleSubmit} isLoading={isLoading} />
      )}

      <Modal 
        isOpen={showResultModal} 
        onClose={() => setShowResultModal(false)}
        title={error ? "Error en la Evaluación" : "Tu Perfil de Sueño Personalizado"}
        size="lg"
      >
        {error && (
          <div className="text-center">
            <ExclamationCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Button onClick={() => setShowResultModal(false)} variant="secondary">Cerrar</Button>
          </div>
        )}
        {sleepProfile && !error && (
          <div>
            <div className="flex items-center text-green-600 mb-4">
                <CheckCircleIcon className="w-8 h-8 mr-2"/>
                <p className="text-xl font-semibold">¡Análisis completado!</p>
            </div>
            {renderProfileDetails(sleepProfile)}
            <div className="mt-8 flex justify-end space-x-3">
                <Button onClick={() => setShowResultModal(false)} variant="secondary">Cerrar</Button>
                {/* <Link to="/my-plan">
                    <Button variant="primary">Ver Mi Plan Detallado</Button>
                </Link> */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AssessmentPage;