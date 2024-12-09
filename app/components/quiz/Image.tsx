import type { ComponentConfig } from "~/types/quiz";

interface ImageProps {
  config: ComponentConfig["image"];
}

export function Image({ config }: ImageProps) {
  if (!config) return null;

  return (
    <div className="rounded-lg overflow-hidden">
      <img
        src={config.url}
        alt={config.alt}
        className="w-full h-auto object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
        }}
      />
    </div>
  );
}