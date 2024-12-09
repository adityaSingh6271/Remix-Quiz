import type { QuizComponent } from "~/types/quiz";
import { QuizTimer } from "./QuizTimer";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizImage } from "./QuizImage";
import { QuizOptions } from "./QuizOptions";

interface QuizContentProps {
  components: QuizComponent[];
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: { minutes: number; seconds: number };
  onAnswer: (index: number) => void;
}

export function QuizContent({
  components,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onAnswer,
}: QuizContentProps) {
  return (
    <div className="space-y-6">
      {components.map((component) => {
        switch (component.type) {
          case "progress":
            return (
              <QuizProgress
                key={component.id}
                current={currentQuestion}
                total={totalQuestions}
              />
            );
          case "timer":
            return (
              <QuizTimer
                key={component.id}
                minutes={timeLeft.minutes}
                seconds={timeLeft.seconds}
              />
            );
          case "question":
            return (
              <QuizQuestion
                key={component.id}
                current={currentQuestion}
                total={totalQuestions}
                text={component.config.question?.text}
              />
            );
          case "image":
            return (
              <QuizImage
                key={component.id}
                url={component.config.image?.url}
                alt={component.config.image?.alt}
              />
            );
          case "options":
            return (
              <QuizOptions
                key={component.id}
                items={component.config.options?.items || []}
                onSelect={onAnswer}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}