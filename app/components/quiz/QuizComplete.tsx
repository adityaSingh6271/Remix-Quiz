import { Link } from "@remix-run/react";

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

export function QuizComplete({ score, totalQuestions, onPlayAgain }: QuizCompleteProps) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
      <p className="text-lg text-gray-600">
        Your score: {score}/{totalQuestions}
      </p>
      <div className="space-x-4">
        <button
          onClick={onPlayAgain}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
        <Link
          to="/"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-gray-700 transition-colors inline-block"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}