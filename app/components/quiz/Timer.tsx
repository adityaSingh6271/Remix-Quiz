import type { ComponentConfig } from "~/types/quiz";

interface TimerProps {
  config: ComponentConfig["timer"];
}

export function Timer({ config }: TimerProps) {
  if (!config) return null;

  return (
    <div className="text-center text-2xl font-bold">
      {String(config.minutes).padStart(2, "0")}:
      {String(config.seconds).padStart(2, "0")}
    </div>
  );
}