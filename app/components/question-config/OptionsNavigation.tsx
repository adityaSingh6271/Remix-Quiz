interface OptionsNavigationProps {
  questionNumber: number;
  totalQuestions: number;
  onNavigate: (questionNumber: number) => void;
}

export function OptionsNavigation({
  questionNumber,
  totalQuestions,
  onNavigate,
}: OptionsNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium text-gray-900">
        Options for Question {questionNumber} of {totalQuestions}
      </h3>
      <div className="space-x-2">
        <button
          onClick={() => onNavigate(questionNumber - 1)}
          disabled={questionNumber === 1}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Previous
        </button>
        <button
          onClick={() => onNavigate(questionNumber + 1)}
          disabled={questionNumber === totalQuestions}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}