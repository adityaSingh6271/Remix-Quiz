interface OptionsInputProps {
  options: string[];
  correctAnswer: number;
  onOptionChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (index: number) => void;
  onSave: () => void;
  hasChanges: boolean;
}

export function OptionsInput({
  options,
  correctAnswer,
  onOptionChange,
  onCorrectAnswerChange,
  onSave,
  hasChanges,
}: OptionsInputProps) {
  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex-1">
            <label
              htmlFor={`option-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Option {String.fromCharCode(65 + index)}
            </label>
            <input
              type="text"
              id={`option-${index}`}
              value={option}
              onChange={(e) => onOptionChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
            />
          </div>
          <div className="pt-6">
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === index}
              onChange={() => onCorrectAnswerChange(index)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Correct</span>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={!hasChanges}
          className={`px-4 py-2 rounded-md ${
            hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save Options
        </button>
      </div>
    </div>
  );
}