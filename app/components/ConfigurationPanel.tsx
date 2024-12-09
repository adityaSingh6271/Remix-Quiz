import { useState } from "react";
import type { QuizComponent } from "~/types/quiz";
import { ProgressBarConfig } from "./configs/ProgressBarConfig";
import { TimerConfig } from "./configs/TimerConfig";
import { QuestionManager } from "./question-config/QuestionManager";
import { ImageConfig } from "./configs/ImageConfig";

interface ConfigurationPanelProps {
  component: QuizComponent;
  onSave: (id: string, config: QuizComponent["config"]) => void;
  onCancel: () => void;
}

export function ConfigurationPanel({
  component,
  onSave,
  onCancel,
}: ConfigurationPanelProps) {
  const [config, setConfig] = useState(component.config);

  const handleSave = () => {
    onSave(component.id, config);
  };

  const handleQuestionAndOptionsSave = (
    questionNumber: number,
    questionConfig: QuizComponent["config"]["question"],
    optionsConfig: QuizComponent["config"]["options"]
  ) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      question: questionConfig,
      options: optionsConfig,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Configure {component.type}</h2>
        
        <div className="space-y-4">
          {component.type === "progress" && (
            <ProgressBarConfig
              config={config.progressBar}
              onChange={(progressConfig) =>
                setConfig({ ...config, progressBar: progressConfig })
              }
            />
          )}
          
          {component.type === "timer" && (
            <TimerConfig
              config={config.timer}
              onChange={(timerConfig) =>
                setConfig({ ...config, timer: timerConfig })
              }
            />
          )}
          
          {(component.type === "question" || component.type === "options") && (
            <QuestionManager
              initialQuestions={[config.question]}
              initialOptions={[config.options]}
              totalQuestions={3}
              onSave={handleQuestionAndOptionsSave}
            />
          )}
          
          {component.type === "image" && (
            <ImageConfig
              config={config.image}
              onChange={(imageConfig) =>
                setConfig({ ...config, image: imageConfig })
              }
            />
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}