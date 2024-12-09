import { useState } from "react";
import { QuestionNavigation } from "./QuestionNavigation";
import { QuestionInput } from "./QuestionInput";
import type { QuestionConfig } from "~/types/quiz";

interface QuestionFormProps {
  config?: QuestionConfig;
  questionNumber: number;
  totalQuestions: number;
  onSave: (config: QuestionConfig) => void;
  onNavigate: (questionNumber: number) => void;
}

export function QuestionForm({
  config,
  questionNumber,
  totalQuestions,
  onSave,
  onNavigate,
}: QuestionFormProps) {
  const [questionText, setQuestionText] = useState(config?.text || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    if (!questionText.trim()) {
      return;
    }

    onSave({
      text: questionText,
      current: questionNumber,
      total: totalQuestions,
    });
    setHasChanges(false);
  };

  const handleTextChange = (text: string) => {
    setQuestionText(text);
    setHasChanges(true);
  };

  const handleNavigate = (newQuestionNumber: number) => {
    if (hasChanges) {
      const shouldSave = window.confirm(
        "You have unsaved changes. Would you like to save before continuing?"
      );
      if (shouldSave) {
        handleSave();
      }
    }
    onNavigate(newQuestionNumber);
  };

  return (
    <div className="space-y-6">
      <QuestionNavigation
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        onNavigate={handleNavigate}
      />
      
      <QuestionInput
        value={questionText}
        onChange={handleTextChange}
        onSave={handleSave}
        hasChanges={hasChanges}
      />
    </div>
  );
}