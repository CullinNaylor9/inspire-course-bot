
export const BLOCK_TYPES = {
  CONTROL: [
    'Run Forever',
    'Repeat',
    'If',
    'Else',
    'Function',
  ],
  MOVEMENT: [
    'Left Motor Forward',
    'Right Motor Forward',
    'Left Motor Stop',
    'Right Motor Stop',
    'Move Forward',
    'Turn Right',
    'Turn Left',
  ],
  SERVO: [
    'Set Servo P0 to 0',
    'Set Servo P0 to 90',
    'Set Servo P0 to 180',
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
