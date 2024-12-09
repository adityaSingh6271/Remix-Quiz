interface QuizTimerProps {
  minutes: number;
  seconds: number;
}

export function QuizTimer({ minutes, seconds }: QuizTimerProps) {
  return (
    <div className="text-center text-lg font-semibold text-gray-700">
      Time Left: {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}