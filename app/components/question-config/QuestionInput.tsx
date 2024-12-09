interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  hasChanges: boolean;
}

export function QuestionInput({
  value,
  onChange,
  onSave,
  hasChanges,
}: QuestionInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="question-text"
          className="block text-sm font-medium text-gray-700"
        >
          Question Text
        </label>
        <textarea
          id="question-text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your question here..."
        />
      </div>

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
          Save Question
        </button>
      </div>
    </div>
  );
}