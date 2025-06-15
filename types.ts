export interface QuestionnaireAnswers {
  [key: string]: string | number;
}

export interface SleepProfile {
  summary: string;
  identifiedPatterns: string[];
  possibleInsomniaCauses: string[];
  chronotype: string;
  recommendations?: string[];
}

export interface SleepLog {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number; // e.g., 1-5
  notes?: string;
}

export interface UserContextType {
  sleepProfile: SleepProfile | null;
  setSleepProfile: React.Dispatch<React.SetStateAction<SleepProfile | null>>;
  apiKeyPresent: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

export enum Chronotype {
    LARK = "Alondra (Madrugador)",
    OWL = "Búho (Nocturno)",
    HUMMINGBIRD = "Colibrí (Intermedio)",
    UNKNOWN = "Desconocido"
}