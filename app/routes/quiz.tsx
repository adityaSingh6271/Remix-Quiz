import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { QuizState } from "~/types/quiz";
import { defaultQuizConfig } from "~/services/defaultQuizConfig";
import { getStoredComponents } from "~/services/quizStore.server";
import { QuizComplete } from "~/components/quiz/QuizComplete";
import { QuizContent } from "~/components/quiz/QuizContent";

export async function loader() {
  const storedComponents = getStoredComponents();
  const components = storedComponents.length > 0 ? storedComponents : defaultQuizConfig;
  
  // Find timer configuration
  const timerComponent = components.find(c => c.type === "timer");
  const initialMinutes = timerComponent?.config?.timer?.minutes ?? 2;
  const initialSeconds = timerComponent?.config?.timer?.seconds ?? 0;
  
  const initialState: QuizState = {
    components,
    currentQuestion: 1,
    totalQuestions: components.filter(c => c.type === "question").length || 3,
    score: 0,
    isComplete: false,
    timeLeft: {
      minutes: initialMinutes,
      seconds: initialSeconds,
    },
  };

  return json(initialState);
}

export default function QuizView() {
  const quizState = useLoaderData<typeof loader>();
  const [state, setState] = useState(quizState);
  const [timeLeft, setTimeLeft] = useState(quizState.timeLeft);

  useEffect(() => {
    if (!state.isComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            clearInterval(timer);
            setState((s) => ({ ...s, isComplete: true }));
            return prev;
          }

          if (prev.seconds === 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          }

          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.isComplete]);

  const handleAnswer = (answerIndex: number) => {
    const currentOptionsComponent = state.components.find(
      (c) => c.type === "options" && c.id.includes(`-${state.currentQuestion}`)
    );

    const isCorrect =
      currentOptionsComponent?.config?.options?.correctAnswer === answerIndex;

    setState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentQuestion: prev.currentQuestion + 1,
      isComplete: prev.currentQuestion >= prev.totalQuestions,
    }));
  };

  const handlePlayAgain = () => {
    setState({
      ...quizState,
      currentQuestion: 1,
      score: 0,
      isComplete: false,
    });
    setTimeLeft(quizState.timeLeft);
  };

  const currentComponents = state.components.filter(component => {
    if (component.type === "question" || component.type === "options" || component.type === "image") {
      return component.id.includes(`-${state.currentQuestion}`);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-2">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        {state.isComplete ? (
          <QuizComplete
            score={state.score}
            totalQuestions={state.totalQuestions}
            onPlayAgain={handlePlayAgain}
          />
        ) : (
          <QuizContent
            components={currentComponents}
            currentQuestion={state.currentQuestion}
            totalQuestions={state.totalQuestions}
            timeLeft={timeLeft}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}