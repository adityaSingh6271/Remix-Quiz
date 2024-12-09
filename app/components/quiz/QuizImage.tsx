interface QuizImageProps {
  url?: string;
  alt?: string;
}

export function QuizImage({ url, alt }: QuizImageProps) {
  if (!url) return null;
  
  return (
    <div className="flex justify-center">
      <img
        src={url}
        alt={alt || "Question Image"}
        className="max-w-xs h-auto rounded-lg shadow-md"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
        }}
      />
    </div>
  );
}