interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-lg h-4">
      <div
        className="bg-blue-600 h-4 rounded-lg transition-all duration-300"
        style={{
          width: `${(current / total) * 100}%`,
        }}
      />
    </div>
  );
}