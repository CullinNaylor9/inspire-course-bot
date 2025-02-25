
export const BLOCK_TYPES = {
  CONTROL: [
    'Run Forever',
    'Repeat',
    'If',
    'Else',
    'Function',
  ],
  MOVEMENT: [
    'Digital Write Pin P12 to',
    'Digital Write Pin P13 to',
    'Digital Write Pin P14 to',
    'Digital Write Pin P15 to',
    'Move Forward',
    'Turn Right',
    'Turn Left',
  ],
  SERVO: [
    'Digital Write Pin P0 to',
  ],
  BASIC: [
    'Wait 500 milliseconds',
    'Wait 1000 milliseconds',
    'Wait 2000 milliseconds',
  ],
} as const;

export type BlockType = 'control' | 'movement' | 'servo' | 'basic';

export const getBlockType = (content: string): BlockType => {
  if (BLOCK_TYPES.CONTROL.some(type => content.includes(type))) return 'control';
  if (BLOCK_TYPES.MOVEMENT.some(type => content.includes(type))) return 'movement';
  if (BLOCK_TYPES.SERVO.some(type => content.includes(type))) return 'servo';
  return 'basic';
};
