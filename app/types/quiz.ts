export interface QuizComponent {
  id: string;
  type: 'progress' | 'timer' | 'question' | 'image' | 'options';
  position: { x: number; y: number };
  config: ComponentConfig;
}

export interface ComponentConfig {
  progressBar?: ProgressBarConfig;
  timer?: TimerConfig;
  question?: QuestionConfig;
  image?: ImageConfig;
  options?: OptionsConfig;
}

export interface ProgressBarConfig {
  color: string;
  width: string;
  height: string;
}

export interface TimerConfig {
  minutes: number;
  seconds: number;
}

export interface QuestionConfig {
  total: number;
  current: number;
  text: string;
}

export interface ImageConfig {
  url: string;
  alt: string;
}

export interface OptionsConfig {
  items: string[];
  correctAnswer: number;
}

export interface QuizState {
  components: QuizComponent[];
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  isComplete: boolean;
  timeLeft: {
    minutes: number;
    seconds: number;
  };
}