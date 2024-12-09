import { useState } from "react";
import { OptionsNavigation } from "./OptionsNavigation";
import { OptionsInput } from "./OptionsInput";
import type { OptionsConfig } from "~/types/quiz";

interface OptionsFormProps {
  config?: OptionsConfig;
  questionNumber: number;
  totalQuestions: number;
  onSave: (config: OptionsConfig) => void;
  onNavigate: (questionNumber: number) => void;
}

export function OptionsForm({
  config,
  questionNumber,
  totalQuestions,
  onSave,
  onNavigate,
}: OptionsFormProps) {
  const [options, setOptions] = useState<string[]>(
    config?.items || ["", "", "", ""]
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>(
    config?.correctAnswer || 0
  );
  const [hasChanges, setHasChanges] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setHasChanges(true);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswer(index);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (options.some((option) => !option.trim())) {
      return;
    }

    onSave({
      items: options,
      correctAnswer,
    });
    setHasChanges(false);
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
      <OptionsNavigation
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        onNavigate={handleNavigate}
      />
      
      <OptionsInput
        options={options}
        correctAnswer={correctAnswer}
        onOptionChange={handleOptionChange}
        onCorrectAnswerChange={handleCorrectAnswerChange}
        onSave={handleSave}
        hasChanges={hasChanges}
      />
    </div>
  );
}