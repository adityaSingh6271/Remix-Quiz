import { useState } from "react";

interface OptionsConfigProps {
  config?: {
    items: string[];
    correctAnswer: number;
  };
  questionNumber: number;
  totalQuestions: number;
  onChange: (config: NonNullable<OptionsConfigProps["config"]>) => void;
}

export function OptionsConfig({ config, questionNumber, totalQuestions, onChange }: OptionsConfigProps) {
  const [currentPage, setCurrentPage] = useState(questionNumber);
  const currentConfig = config || {
    items: ["", "", "", ""],
    correctAnswer: 0,
  };

  const handleOptionChange = (index: number, value: string) => {
    const newItems = [...currentConfig.items];
    newItems[index] = value;
    onChange({ ...currentConfig, items: newItems });
  };

  const handleCorrectAnswerChange = (index: number) => {
    onChange({ ...currentConfig, correctAnswer: index });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Options for Question {currentPage} of {totalQuestions}
        </h3>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalQuestions, prev + 1))}
            disabled={currentPage === totalQuestions}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {currentConfig.items.map((option, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Option {index + 1}
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
            <div className="pt-6">
              <input
                type="radio"
                name="correctAnswer"
                checked={currentConfig.correctAnswer === index}
                onChange={() => handleCorrectAnswerChange(index)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Correct</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}