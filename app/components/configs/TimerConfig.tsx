interface TimerConfigProps {
  config?: {
    minutes: number;
    seconds: number;
  };
  onChange: (config: NonNullable<TimerConfigProps["config"]>) => void;
}

export function TimerConfig({ config, onChange }: TimerConfigProps) {
  const currentConfig = config || {
    minutes: 5,
    seconds: 0,
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Minutes</label>
        <input
          type="number"
          min="0"
          max="60"
          value={currentConfig.minutes}
          onChange={(e) =>
            onChange({ ...currentConfig, minutes: parseInt(e.target.value, 10) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Seconds</label>
        <input
          type="number"
          min="0"
          max="59"
          value={currentConfig.seconds}
          onChange={(e) =>
            onChange({ ...currentConfig, seconds: parseInt(e.target.value, 10) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}