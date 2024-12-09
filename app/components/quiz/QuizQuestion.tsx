interface QuizQuestionProps {
  current: number;
  total: number;
  text?: string;
}

export function QuizQuestion({ current, total, text }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        Question {current} of {total}
      </h2>
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
}