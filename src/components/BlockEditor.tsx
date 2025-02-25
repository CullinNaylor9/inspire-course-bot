
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { BlockType, getBlockType, PINS } from '@/lib/blockTypes';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CodeBlock {
  id: string;
  content: string;
  type: BlockType;
  hasInput?: boolean;
  hasPin?: boolean;
}

interface BlockEditorProps {
  initialBlocks: CodeBlock[];
  availableBlocks: CodeBlock[];
  onSubmit: (code: string) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ initialBlocks, availableBlocks, onSubmit }) => {
  const [workspace, setWorkspace] = useState<CodeBlock[]>(initialBlocks);
  const [palette, setPalette] = useState<CodeBlock[]>(availableBlocks);
  const [blockInputs, setBlockInputs] = useState<Record<string, string[]>>({});
  const [pinInputs, setPinInputs] = useState<Record<string, string[]>>({});

  const getBlockStyle = (type: BlockType) => {
    switch (type) {
      case 'control':
        return 'bg-yellow-500';
      case 'movement':
        return 'bg-blue-500';
      case 'servo':
        return 'bg-purple-500';
      case 'basic':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === result.destination.droppableId) {
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
      const newBlock = { 
        ...palette[result.source.index],
        id: `${palette[result.source.index].id}-${Date.now()}`,
        hasInput: palette[result.source.index].content.includes('???'),
        hasPin: palette[result.source.index].content.includes('P???'),
      };
      setWorkspace([...workspace, newBlock]);
    }
  };

  const generateCode = () => {
    const code = workspace.map(block => {
      let content = block.content;
      if (block.hasPin) {
        const pinCount = (content.match(/P\?\?\?/g) || []).length;
        for (let i = 0; i < pinCount; i++) {
          content = content.replace('P???', `P${pinInputs[block.id]?.[i] || '0'}`);
        }
      }
      if (block.hasInput) {
        const inputCount = (content.match(/\?\?\?/g) || []).filter(match => !content.substring(content.indexOf(match) - 1, content.indexOf(match)).includes('P')).length;
        let inputIndex = 0;
        content = content.replace(/\?\?\?/g, (match, offset) => {
          if (content.substring(offset - 1, offset).includes('P')) {
            return match;
          }
          return blockInputs[block.id]?.[inputIndex++] || '0';
        });
      }
      return content;
    }).join('\n');
    onSubmit(code);
  };

  const renderBlockContent = (block: CodeBlock) => {
    const parts = block.content.split(/(\?\?\?|P\?\?\?)/g);
    
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {parts.map((part, index) => {
          if (part === 'P???') {
            return (
              <React.Fragment key={index}>
                <span>P</span>
                <Select
                  value={pinInputs[block.id]?.[0] || ''}
                  onValueChange={(value) => setPinInputs(prev => ({
                    ...prev,
                    [block.id]: [...(prev[block.id] || []), value]
                  }))}
                >
                  <SelectTrigger className="w-20 h-8 px-2 py-0 bg-white/90 text-black border-white/20">
                    <SelectValue placeholder="Pin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-white/20">
                    {PINS.map((pin) => (
                      <SelectItem 
                        key={pin} 
                        value={pin}
                        className="text-black hover:bg-gray-100"
                      >
                        {pin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </React.Fragment>
            );
          } else if (part === '???') {
            const inputIndex = (block.content.substring(0, block.content.indexOf(part)).match(/\?\?\?/g) || []).length;
            return (
              <Input
                key={index}
                type="number"
                value={blockInputs[block.id]?.[inputIndex] || ''}
                onChange={(e) => setBlockInputs(prev => ({
                  ...prev,
                  [block.id]: Object.assign([...(prev[block.id] || [])], { [inputIndex]: e.target.value })
                }))}
                className="w-20 h-8 px-2 py-0 bg-white/90 text-black border-white/20"
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-1/3 bg-accent/10 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Code Blocks</h3>
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
                        {renderBlockContent(block)}
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
            <h3 className="font-bold text-white mb-4">Program</h3>
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
                          {renderBlockContent(block)}
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
