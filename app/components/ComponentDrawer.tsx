import { DraggableComponent } from "./DraggableComponent";

interface ComponentDrawerProps {
  components: Array<{
    id: string;
    type: string;
    label: string;
  }>;
}

export function ComponentDrawer({ components }: ComponentDrawerProps) {
  return (
    <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-3">
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            id={component.id}
            label={component.label}
          />
        ))}
      </div>
    </div>
  );
}