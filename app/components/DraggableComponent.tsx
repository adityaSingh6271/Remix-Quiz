import { useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";

interface DraggableComponentProps {
  id: string;
  label: string;
}

export function DraggableComponent({ id, label }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        "w-full touch-none select-none",
        "p-4 bg-white rounded-lg shadow-md cursor-move transition-all",
        "hover:shadow-lg hover:border-blue-500 border-2 border-transparent",
        isDragging ? "opacity-50" : "opacity-100"
      )}
    >
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-500 mt-1">Drag to grid</div>
    </div>
  );
}