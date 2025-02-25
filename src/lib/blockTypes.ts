
export const PINS = Array.from({ length: 17 }, (_, i) => i.toString());

export const BLOCK_TYPES = {
  CONTROL: [
    'Run Forever',
    'Repeat',
    'If',
    'Else',
    'Function',
    'on button A pressed',
    'on button B pressed'
  ],
  MOVEMENT: [
    'Digital Write Pin P??? to ???'
  ],
  SERVO: [
    'Digital Write Pin P??? to ???'
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
