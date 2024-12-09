import type { ComponentConfig } from "~/types/quiz";

interface ProgressBarProps {
  config: ComponentConfig["progressBar"];
}

export function ProgressBar({ config }: ProgressBarProps) {
  if (!config) return null;

  return (
    <div className="w-full">
      <div 
        className="bg-gray-200 rounded-full"
        style={{ height: config.height }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: config.width,
            height: config.height,
            backgroundColor: config.color,
          }}
        />
      </div>
    </div>
  );
}