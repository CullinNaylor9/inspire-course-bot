
import React, { useState, useEffect } from 'react';
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
  const [waitInputs, setWaitInputs] = useState<Record<string, string>>({});
  const [isMobileView, setIsMobileView] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  // iOS Safari needs this to fix the dragging issues
  useEffect(() => {
    // Disable page scrolling when dragging on touch devices
    const preventDefaultTouchMove = (e: TouchEvent) => {
      if (e.target instanceof Element && 
          (e.target.closest('.draggable-item') || e.target.closest('.droppable-area'))) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefaultTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDefaultTouchMove);
    };
  }, []);

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

  // Add block from palette to workspace on touch devices
  const handleAddBlock = (blockIndex: number) => {
    if (isMobileView) {
      const newBlock = { 
        ...palette[blockIndex],
        id: `${palette[blockIndex].id}-${Date.now()}`,
        hasInput: palette[blockIndex].content.includes('???'),
        hasPin: palette[blockIndex].content.includes('P???')
      };
      setWorkspace([...workspace, newBlock]);
    }
  };

  // Remove block from workspace on touch devices
  const handleRemoveBlock = (blockIndex: number) => {
    if (isMobileView) {
      const newWorkspace = [...workspace];
      newWorkspace.splice(blockIndex, 1);
      setWorkspace(newWorkspace);
    }
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
      {isMobileView ? (
        // Mobile/iPad specific UI
        <>
          <div className="w-full bg-accent/10 p-4 rounded-lg mb-4">
            <h3 className="font-bold mb-4">Code Blocks</h3>
            <div className="space-y-2 droppable-area">
              {palette.map((block, index) => (
                <div 
                  key={block.id} 
                  className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white draggable-item relative`}
                  onClick={() => handleAddBlock(index)}
                >
                  {renderBlockContent(block)}
                  <div className="absolute right-2 top-2 bg-white/20 px-2 py-1 rounded text-xs">
                    Tap to add
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="bg-black/90 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-white mb-4">Program</h3>
              <div className="min-h-[200px] space-y-2 droppable-area">
                {workspace.map((block, index) => (
                  <div 
                    key={block.id} 
                    className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white draggable-item relative`}
                  >
                    {renderBlockContent(block)}
                    <button 
                      className="absolute right-2 top-2 bg-white/20 text-white h-6 w-6 flex items-center justify-center rounded-full"
                      onClick={() => handleRemoveBlock(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {workspace.length === 0 && (
                  <p className="text-gray-400 text-center py-10">Tap blocks above to add them here</p>
                )}
              </div>
            </div>
            <button
              onClick={generateCode}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full"
            >
              Run Code
            </button>
          </div>
        </>
      ) : (
        // Desktop drag-and-drop UI
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="w-full md:w-1/3 bg-accent/10 p-4 rounded-lg mb-4 md:mb-0">
            <h3 className="font-bold mb-4">Code Blocks</h3>
            <Droppable droppableId="palette">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 droppable-area"
                >
                  {palette.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-move draggable-item`}
                          style={{
                            ...provided.draggableProps.style,
                            touchAction: 'none' // Improve touch handling
                          }}
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

          <div className="w-full md:w-2/3">
            <div className="bg-black/90 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-white mb-4">Program</h3>
              <Droppable droppableId="workspace">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] space-y-2 droppable-area"
                  >
                    {workspace.map((block, index) => (
                      <Draggable key={block.id} draggableId={block.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${getBlockStyle(block.type)} p-3 rounded-lg text-white cursor-move draggable-item`}
                            style={{
                              ...provided.draggableProps.style,
                              touchAction: 'none' // Improve touch handling
                            }}
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
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg w-full md:w-auto"
            >
              Run Code
            </button>
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default BlockEditor;
