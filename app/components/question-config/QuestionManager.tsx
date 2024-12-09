import { useState, useEffect } from "react";
import { QuestionForm } from "./QuestionForm";
import { OptionsForm } from "./OptionsForm";
import type { QuestionConfig, OptionsConfig } from "~/types/quiz";

interface QuestionManagerProps {
  initialQuestions?: QuestionConfig[];
  initialOptions?: OptionsConfig[];
  totalQuestions: number;
  onSave: (questionNumber: number, question: QuestionConfig, options: OptionsConfig) => void;
}

export function QuestionManager({
  initialQuestions = [],
  initialOptions = [],
  totalQuestions,
  onSave,
}: QuestionManagerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<(QuestionConfig | undefined)[]>(
    Array.from({ length: totalQuestions }, (_, i) => initialQuestions[i])
  );
  const [options, setOptions] = useState<(OptionsConfig | undefined)[]>(
    Array.from({ length: totalQuestions }, (_, i) => initialOptions[i])
  );

  // Reset form when navigating to a new question
  useEffect(() => {
    if (!questions[currentQuestion - 1] && !options[currentQuestion - 1]) {
      // Clear any existing data for new questions
      const newQuestions = [...questions];
      const newOptions = [...options];
      
      newQuestions[currentQuestion - 1] = {
        total: totalQuestions,
        current: currentQuestion,
        text: "",
      };
      
      newOptions[currentQuestion - 1] = {
        items: ["", "", "", ""],
        correctAnswer: 0,
      };
      
      setQuestions(newQuestions);
      setOptions(newOptions);
    }
  }, [currentQuestion, questions, options, totalQuestions]);

  const handleQuestionSave = (config: QuestionConfig) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion - 1] = config;
    setQuestions(newQuestions);
    
    const currentOptions = options[currentQuestion - 1];
    if (currentOptions) {
      onSave(currentQuestion, config, currentOptions);
    }

    // Auto-advance to next question after saving if not on last question
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleOptionsSave = (config: OptionsConfig) => {
    const newOptions = [...options];
    newOptions[currentQuestion - 1] = config;
    setOptions(newOptions);
    
    const currentQuestion = questions[currentQuestion - 1];
    if (currentQuestion) {
      onSave(currentQuestion, currentQuestion, config);
    }
  };

  const handleNavigate = (newQuestionNumber: number) => {
    setCurrentQuestion(newQuestionNumber);
  };

  return (
    <div className="space-y-8">
      <QuestionForm
        config={questions[currentQuestion - 1]}
        questionNumber={currentQuestion}
        totalQuestions={totalQuestions}
        onSave={handleQuestionSave}
        onNavigate={handleNavigate}
      />
      
      <div className="border-t border-gray-200 my-6" />
      
      <OptionsForm
        config={options[currentQuestion - 1]}
        questionNumber={currentQuestion}
        totalQuestions={totalQuestions}
        onSave={handleOptionsSave}
        onNavigate={handleNavigate}
      />
    </div>
  );
}