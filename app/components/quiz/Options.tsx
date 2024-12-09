import type { ComponentConfig } from "~/types/quiz";

interface OptionsProps {
  config: ComponentConfig["options"];
  onSelect?: (index: number) => void;
}

export function Options({ config, onSelect }: OptionsProps) {
  if (!config) return null;

  return (
    <div className="grid grid-cols-1 gap-3">
      {config.items.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(index)}
          className="p-3 text-left bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
        >
          {item}
        </button>
      ))}
    </div>
  );
}