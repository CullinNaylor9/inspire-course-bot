
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
import { Trash2, Plus } from "lucide-react";

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
  const [waitInputs, setWaitInputs] = useState<Record<string, string>>({});

  const getBlockStyle = (type: BlockType) => {
    switch (type) {
      case 'control':
        return 'bg-purple-500';
      case 'movement':
        return 'bg-red-500';
      case 'servo':
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
        hasPin: palette[result.source.index].content.includes('P???')
      };
      setWorkspace([...workspace, newBlock]);
    }
  };

  // Function to add block by tapping
  const addBlock = (block: CodeBlock) => {
    const newBlock = { 
      ...block,
      id: `${block.id}-${Date.now()}`,
      hasInput: block.content.includes('???'),
      hasPin: block.content.includes('P???')
    };
    setWorkspace([...workspace, newBlock]);
  };

  // Move a block up in the workspace
  const moveBlockUp = (index: number) => {
    if (index === 0) return; // Already at the top
    const newWorkspace = [...workspace];
    const temp = newWorkspace[index];
    newWorkspace[index] = newWorkspace[index - 1];
    newWorkspace[index - 1] = temp;
    setWorkspace(newWorkspace);
  };

  // Move a block down in the workspace
  const moveBlockDown = (index: number) => {
    if (index === workspace.length - 1) return; // Already at the bottom
    const newWorkspace = [...workspace];
    const temp = newWorkspace[index];
    newWorkspace[index] = newWorkspace[index + 1];
    newWorkspace[index + 1] = temp;
    setWorkspace(newWorkspace);
  };

  // Remove a block from the workspace
  const removeBlock = (index: number) => {
    const newWorkspace = [...workspace];
    newWorkspace.splice(index, 1);
    setWorkspace(newWorkspace);
  };

  const generateCode = () => {
    const code = workspace.map(block => {
      let content = block.content;
      
      // Handle wait milliseconds inputs
      if (content.includes('Wait') && content.includes('milliseconds')) {
        const waitTime = waitInputs[block.id] || '1000';
        return `Wait ${waitTime} milliseconds`;
      }
      
      // Handle pin inputs
      if (block.hasPin) {
        const pinCount = (content.match(/P\?\?\?/g) || []).length;
        for (let i = 0; i < pinCount; i++) {
          content = content.replace('P???', `P${pinInputs[block.id]?.[i] || '0'}`);
        }
      }
      
      // Handle other inputs
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
    // Special handling for wait blocks to allow custom milliseconds input
    if (block.content.includes('Wait') && block.content.includes('milliseconds')) {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          <span>Wait</span>
          <Input
            type="number"
            className="w-20 h-8 px-2 py-0 bg-white/90 text-black"
            placeholder="1000"
            value={waitInputs[block.id] || ''}
            onChange={(e) => setWaitInputs({ ...waitInputs, [block.id]: e.target.value })}
          />
          <span>milliseconds</span>
        </div>
      );
    }
    
    // Handle other blocks with regular pin/input replacement
    const parts = block.content.split(/(\?\?\?|P\?\?\?)/g);
    
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {parts.map((part, index) => {
          if (part === 'P???') {
            const pinIndex = (block.content.substring(0, block.content.indexOf(part)).match(/P\?\?\?/g) || []).length;
            return (
              <React.Fragment key={index}>
                <span>P</span>
                <Select
                  value={pinInputs[block.id]?.[pinIndex] || ''}
                  onValueChange={(value) => setPinInputs(prev => ({
                    ...prev,
                    [block.id]: Object.assign([...(prev[block.id] || [])], { [pinIndex]: value })
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
            const inputIndex = (block.content.substring(0, block.content.indexOf(part)).match(/\?\?\?/g) || []).filter(match => 
              !block.content.substring(block.content.indexOf(match) - 1, block.content.indexOf(match)).includes('P')
            ).length;
            return (
              <Select
                key={index}
                value={blockInputs[block.id]?.[inputIndex] || ''}
                onValueChange={(value) => setBlockInputs(prev => ({
                  ...prev,
                  [block.id]: Object.assign([...(prev[block.id] || [])], { [inputIndex]: value })
                }))}
              >
                <SelectTrigger className="w-20 h-8 px-2 py-0 bg-white/90 text-black border-white/20">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="0" className="text-black hover:bg-gray-100">0</SelectItem>
                  <SelectItem value="1" className="text-black hover:bg-gray-100">1</SelectItem>
                  <SelectItem value="500" className="text-black hover:bg-gray-100">500</SelectItem>
                  <SelectItem value="1000" className="text-black hover:bg-gray-100">1000</SelectItem>
                  <SelectItem value="2000" className="text-black hover:bg-gray-100">2000</SelectItem>
                </SelectContent>
              </Select>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full md:w-1/3 bg-accent/10 p-4 rounded-lg mb-4 md:mb-0">
          <h3 className="font-bold mb-4">Code Blocks</h3>
          {/* Tap-to-add blocks section */}
          <div className="mb-4 space-y-2">
            <h4 className="text-sm font-medium mb-2">Tap to add:</h4>
            {palette.map((block, index) => (
              <div 
                key={`quick-${block.id}`}
                className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity relative group`}
                onClick={() => addBlock(block)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">{renderBlockContent(block)}</div>
                  <Plus size={18} className="ml-2 text-white/70 group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/20 pt-4 mt-4">
            <h4 className="text-sm font-medium mb-2">Or drag from here:</h4>
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
        </div>

        <div className="w-full md:w-2/3">
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
                          className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-move relative group`}
                        >
                          <div {...provided.dragHandleProps} className="flex-1">
                            {renderBlockContent(block)}
                          </div>
                          
                          {/* Block control buttons */}
                          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center items-center space-y-1 px-2">
                            {/* Move Up button - circular with arrow */}
                            <button 
                              onClick={() => moveBlockUp(index)} 
                              className="h-8 w-8 rounded-full flex items-center justify-center bg-white/30 hover:bg-white/50 transition-colors"
                              title="Move Up"
                              type="button"
                              aria-label="Move block up"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6"/>
                              </svg>
                            </button>
                            
                            {/* Move Down button - circular with arrow */}
                            <button 
                              onClick={() => moveBlockDown(index)} 
                              className="h-8 w-8 rounded-full flex items-center justify-center bg-white/30 hover:bg-white/50 transition-colors"
                              title="Move Down"
                              type="button"
                              aria-label="Move block down"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6"/>
                              </svg>
                            </button>
                            
                            {/* Delete button - circular with trash icon */}
                            <button 
                              onClick={() => removeBlock(index)} 
                              className="h-8 w-8 rounded-full flex items-center justify-center bg-white/30 hover:bg-red-400 transition-colors"
                              title="Delete"
                              type="button"
                              aria-label="Delete block"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
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
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full md:w-auto"
          >
            Run Code
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};

export default BlockEditor;
