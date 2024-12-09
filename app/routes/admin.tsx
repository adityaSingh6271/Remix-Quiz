import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { 
  DndContext, 
  DragOverlay,
  useSensor, 
  useSensors, 
  MouseSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { ComponentDrawer } from "~/components/ComponentDrawer";
import { DroppableGrid } from "~/components/DroppableGrid";
import { ConfigurationPanel } from "~/components/ConfigurationPanel";
import type { QuizComponent } from "~/types/quiz";
import { getStoredComponents, saveComponents } from "~/services/quizStore.server";
import { Link } from "@remix-run/react";

export async function loader() {
  const storedComponents = getStoredComponents();
  const questionCount = storedComponents.filter(c => c.type === 'question').length || 3;

  return json({
    components: storedComponents,
    availableComponents: [
      { id: "progress", type: "progress", label: "Progress Bar", maxInstances: 1 },
      { id: "timer", type: "timer", label: "Timer", maxInstances: 1 },
      { id: "question", type: "question", label: "Question Text", maxInstances: questionCount },
      { id: "image", type: "image", label: "Image", maxInstances: questionCount },
      { id: "options", type: "options", label: "Options", maxInstances: questionCount },
    ],
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const components = JSON.parse(formData.get("components") as string);
  saveComponents(components);
  return json({ success: true });
}

function DragOverlayContent({ label }: { label: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-blue-500">
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-500">Drop to place</div>
    </div>
  );
}

export default function AdminView() {
  const { availableComponents, components: initialComponents } = useLoaderData<typeof loader>();
  const [components, setComponents] = useState<QuizComponent[]>(initialComponents);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<QuizComponent | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const submit = useSubmit();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 8,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over) {
      const [cellId, x, y] = over.id.toString().split('-');
      
      if (cellId === 'cell') {
        const draggedComponent = availableComponents.find(
          (c) => c.id === active.id
        );

        if (draggedComponent) {
          // Check if we've reached the maximum instances for this component type
          const currentInstances = components.filter(c => c.type === draggedComponent.type).length;
          if (currentInstances >= draggedComponent.maxInstances) {
            setActiveId(null);
            return;
          }

          const isOccupied = components.some(
            (comp) => comp.position.x === parseInt(x) && comp.position.y === parseInt(y)
          );

          if (!isOccupied) {
            const newComponent: QuizComponent = {
              id: `${draggedComponent.id}-${Date.now()}`,
              type: draggedComponent.type as QuizComponent["type"],
              position: { x: parseInt(x), y: parseInt(y) },
              config: {},
            };

            const updatedComponents = [...components, newComponent];
            setComponents(updatedComponents);
            setSelectedComponent(newComponent);
            setHasUnsavedChanges(true);
          }
        }
      }
    }

    setActiveId(null);
  };

  const handleConfigSave = (id: string, config: QuizComponent["config"]) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, config } : comp
    );
    
    setComponents(updatedComponents);
    setSelectedComponent(null);
    setHasUnsavedChanges(true);
  };

  const handleComponentClick = (component: QuizComponent) => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = (componentId: string) => {
    const updatedComponents = components.filter((comp) => comp.id !== componentId);
    setComponents(updatedComponents);
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
    
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = () => {
    submit(
      { components: JSON.stringify(components) },
      { method: "post" }
    );
    setHasUnsavedChanges(false);
  };

  const activeDraggable = activeId ? availableComponents.find(c => c.id === activeId) : null;

  // Calculate total questions based on question components
  const totalQuestions = Math.max(
    components.filter(c => c.type === 'question').length,
    3 // minimum number of questions
  );

  // Get the question number for the selected component
  const getQuestionNumber = (component: QuizComponent) => {
    if (component.type === 'question') {
      return components
        .filter(c => c.type === 'question')
        .findIndex(c => c.id === component.id) + 1;
    }
    // For other components that need question association
    const match = component.id.match(/-(\d+)$/);
    return match ? parseInt(match[1], 10) : 1;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Quiz Configuration</h1>
            <div className="space-x-4">
              <Link
                to="/quiz"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Preview Quiz
              </Link>
              <button
                onClick={handleSaveAll}
                disabled={!hasUnsavedChanges}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  hasUnsavedChanges
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex">
          <ComponentDrawer 
            components={availableComponents.map(comp => ({
              ...comp,
              disabled: components.filter(c => c.type === comp.type).length >= comp.maxInstances
            }))}
          />
          
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-lg">
              <DroppableGrid 
                components={components}
                onComponentClick={handleComponentClick}
                onDeleteComponent={handleDeleteComponent}
              />
            </div>
          </div>

          <DragOverlay>
            {activeDraggable && (
              <DragOverlayContent label={activeDraggable.label} />
            )}
          </DragOverlay>
        </div>

        {selectedComponent && (
          <ConfigurationPanel
            component={selectedComponent}
            questionNumber={getQuestionNumber(selectedComponent)}
            totalQuestions={totalQuestions}
            onSave={handleConfigSave}
            onCancel={() => setSelectedComponent(null)}
          />
        )}
      </DndContext>
    </div>
  );
}