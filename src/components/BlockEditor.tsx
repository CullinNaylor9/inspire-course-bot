
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface CodeBlock {
  id: string;
  content: string;
  type: 'function' | 'control' | 'pins' | 'basic';
}

interface BlockEditorProps {
  initialBlocks: CodeBlock[];
  availableBlocks: CodeBlock[];
  onSubmit: (code: string) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ initialBlocks, availableBlocks, onSubmit }) => {
  const [workspace, setWorkspace] = useState<CodeBlock[]>(initialBlocks);
  const [palette, setPalette] = useState<CodeBlock[]>(availableBlocks);

  const getBlockStyle = (type: CodeBlock['type']) => {
    switch (type) {
      case 'function':
        return 'bg-purple-500';
      case 'control':
        return 'bg-yellow-500';
      case 'pins':
        return 'bg-blue-500';
      case 'basic':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === result.destination.droppableId) {
      // Reordering within the same list
      const items = Array.from(
        result.source.droppableId === 'workspace' ? workspace : palette
      );
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      if (result.source.droppableId === 'workspace') {
        setWorkspace(items);
      } else {
        setPalette(items);
      }
    } else if (result.destination.droppableId === 'workspace') {
      // Adding block to workspace
      const newBlock = { ...palette[result.source.index] };
      setWorkspace([...workspace, newBlock]);
    }
  };

  const generateCode = () => {
    const code = workspace.map(block => block.content).join('\n');
    onSubmit(code);
  };

  return (
    <div className="flex gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-1/3 bg-accent/10 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Available Blocks</h3>
          <Droppable droppableId="palette">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {palette.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-move`}
                      >
                        {block.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="w-2/3">
          <div className="bg-black/90 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-white mb-4">Workspace</h3>
            <Droppable droppableId="workspace">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] space-y-2"
                >
                  {workspace.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-move`}
                        >
                          {block.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <button
            onClick={generateCode}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
          >
            Run Code
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};

export default BlockEditor;
