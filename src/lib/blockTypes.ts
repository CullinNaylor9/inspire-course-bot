
export type BlockType = 'control' | 'movement' | 'servo' | 'basic';

export function getBlockType(content: string): BlockType {
  if (content.includes('Wait')) return 'basic';
  if (content.includes('Function') || content.includes('Run Forever') || content.includes('Repeat') || content.includes('If')) return 'control';
  if (content.includes('Motor')) return 'movement';
  return 'servo';
}

export const PINS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
