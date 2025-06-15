import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { QuestionnaireAnswers, SleepProfile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // Potentially throw an error or handle this state in the UI
  // For this example, we'll let operations fail if API_KEY is missing,
  // and the UI should ideally inform the user.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, assuming it's checked/handled.

// const model = ai.models; // This line is not used directly, calls are ai.models.generateContent

export const analyzeSleepQuestionnaire = async (answers: QuestionnaireAnswers): Promise<SleepProfile> => {
  if (!API_KEY) {
    throw new Error("API Key no configurada. Por favor, asegúrate de que la API Key de Gemini esté configurada.");
  }
  try {
    const prompt = `
    Eres SerenoIA, un asistente experto en sueño. Analiza las siguientes respuestas del cuestionario de sueño y genera un perfil de sueño personalizado.
    Tu respuesta DEBE ser un objeto JSON con la siguiente estructura:
    {
      "summary": "Un breve resumen del perfil de sueño del usuario.",
      "identifiedPatterns": ["Patrón 1", "Patrón 2", "..."],
      "possibleInsomniaCauses": ["Causa 1", "Causa 2", "..."],
      "chronotype": "Alondra (Madrugador) | Búho (Nocturno) | Colibrí (Intermedio) | Desconocido",
      "recommendations": ["Recomendación 1", "Recomendación 2", "..."]
    }

    Asegúrate de que el cronotipo sea uno de los valores especificados. Si no puedes determinarlo con certeza, usa "Desconocido".
    Las recomendaciones deben ser accionables y personalizadas.

    Respuestas del usuario:
    ${JSON.stringify(answers, null, 2)}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({ // Corrected to use ai.models
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedProfile: SleepProfile = JSON.parse(jsonStr);
    return parsedProfile;

  } catch (error) {
    console.error("Error analyzing sleep questionnaire with Gemini:", error);
    if (error instanceof Error && error.message.includes("API Key not valid")) {
        throw new Error("La API Key de Gemini no es válida. Por favor, verifica tu configuración.");
    }
    // Check for specific Gemini API errors if possible, e.g. based on error.code or structure
    if (error instanceof Error && error.message.includes("fetch failed")) { // Example of a generic network error
        throw new Error("Error de conexión al intentar analizar el cuestionario. Verifica tu conexión a internet.");
    }
    throw new Error("Error al analizar el cuestionario con IA. Inténtalo de nuevo más tarde.");
  }
};

export const generateGeneralText = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key no configurada.");
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({ // Corrected to use ai.models
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
     if (error instanceof Error && error.message.includes("API Key not valid")) {
        throw new Error("La API Key de Gemini no es válida. Por favor, verifica tu configuración.");
    }
    if (error instanceof Error && error.message.includes("fetch failed")) {
        throw new Error("Error de conexión al generar texto. Verifica tu conexión a internet.");
    }
    throw new Error("Error al generar texto con IA.");
  }
};

// Add other Gemini service functions here as needed (e.g., for mindfulness, sound recommendations, etc.)