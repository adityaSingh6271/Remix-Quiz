import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import type { QuizComponent } from "~/types/quiz";
import { ProgressBar } from "./quiz/ProgressBar";
import { Timer } from "./quiz/Timer";
import { Question } from "./quiz/Question";
import { Image } from "./quiz/Image";
import { Options } from "./quiz/Options";

interface DroppableGridProps {
  components: QuizComponent[];
  onComponentClick: (component: QuizComponent) => void;
  onDeleteComponent: (componentId: string) => void;
}

export function DroppableGrid({ 
  components, 
  onComponentClick,
  onDeleteComponent 
}: DroppableGridProps) {
  const gridCells = Array.from({ length: 12 }, (_, index) => ({
    id: `cell-${index % 3}-${Math.floor(index / 3)}`,
    x: index % 3,
    y: Math.floor(index / 3),
  }));

  const renderComponent = (component: QuizComponent) => {
    switch (component.type) {
      case "progress":
        return <ProgressBar config={component.config.progressBar} />;
      case "timer":
        return <Timer config={component.config.timer} />;
      case "question":
        return <Question config={component.config.question} />;
      case "image":
        return <Image config={component.config.image} />;
      case "options":
        return <Options config={component.config.options} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gray-100 min-h-[600px]">
      {gridCells.map((cell) => {
        const { setNodeRef, isOver } = useDroppable({
          id: cell.id,
        });

        const component = components.find(
          (c) => c.position.x === cell.x && c.position.y === cell.y
        );

        return (
          <div
            key={cell.id}
            ref={setNodeRef}
            className={clsx(
              "min-h-[150px] rounded-lg relative transition-all",
              isOver ? "border-2 border-blue-500 bg-blue-50" : "border-2 border-dashed border-gray-300",
              component ? "bg-white shadow-sm" : "",
              "hover:border-blue-300"
            )}
          >
            {component && (
              <div className="absolute inset-0 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <button
                  onClick={() => onDeleteComponent(component.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                >
                  ×
                </button>
                <div
                  onClick={() => onComponentClick(component)}
                  className="cursor-pointer h-full overflow-auto"
                >
                  {renderComponent(component)}
                  {(!component.config || Object.keys(component.config).length === 0) && (
                    <div className="text-sm text-orange-500 mt-2">Click to configure</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}