import { useState } from "react";

interface QuestionConfigProps {
  config?: {
    total: number;
    current: number;
    text: string;
  };
  questionNumber: number;
  totalQuestions: number;
  onChange: (config: NonNullable<QuestionConfigProps["config"]>) => void;
}

export function QuestionConfig({ config, questionNumber, totalQuestions, onChange }: QuestionConfigProps) {
  const [currentPage, setCurrentPage] = useState(questionNumber);
  const currentConfig = config || {
    total: totalQuestions,
    current: questionNumber,
    text: "",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Question {currentPage} of {totalQuestions}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Question Text
        </label>
        <textarea
          value={currentConfig.text}
          onChange={(e) =>
            onChange({
              ...currentConfig,
              current: currentPage,
              text: e.target.value,
            })
          }
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your question here..."
        />
      </div>
    </div>
  );
}