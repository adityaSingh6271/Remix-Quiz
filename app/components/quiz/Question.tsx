import type { ComponentConfig } from "~/types/quiz";

interface QuestionProps {
  config: ComponentConfig["question"];
}

export function Question({ config }: QuestionProps) {
  if (!config) return null;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-500">
        Question {config.current} of {config.total}
      </div>
      <div className="text-lg font-medium text-gray-900">
        {config.text}
      </div>
    </div>
  );
}