interface QuizOptionsProps {
  items: string[];
  onSelect: (index: number) => void;
}

export function QuizOptions({ items, onSelect }: QuizOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {items.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="p-3 text-md text-gray-700 bg-gray-50 rounded-lg border-2 border-gray-200 hover:bg-gray-100 hover:border-blue-500 transition-all duration-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
}