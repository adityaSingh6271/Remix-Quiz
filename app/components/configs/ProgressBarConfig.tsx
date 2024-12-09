interface ProgressBarConfigProps {
  config?: {
    color: string;
    width: string;
    height: string;
  };
  onChange: (config: NonNullable<ProgressBarConfigProps["config"]>) => void;
}

export function ProgressBarConfig({ config, onChange }: ProgressBarConfigProps) {
  const currentConfig = config || {
    color: "blue",
    width: "100%",
    height: "20px",
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <select
          value={currentConfig.color}
          onChange={(e) => onChange({ ...currentConfig, color: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="violet">Violet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Height</label>
        <select
          value={currentConfig.height}
          onChange={(e) => onChange({ ...currentConfig, height: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="16px">Small (16px)</option>
          <option value="20px">Medium (20px)</option>
          <option value="24px">Large (24px)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <select
          value={currentConfig.width}
          onChange={(e) => onChange({ ...currentConfig, width: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="75%">75%</option>
          <option value="100%">100%</option>
        </select>
      </div>
    </div>
  );
}