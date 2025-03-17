
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SimulatorScene } from '@/components/SimulatorScene';
import { SimulatorControls } from '@/components/SimulatorControls';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Simulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [robotCode, setRobotCode] = useState(`// Sample robot code
function moveForward(steps) {
  console.log(\`Moving forward \${steps} steps\`);
}

function turnLeft() {
  console.log('Turning left');
}

function turnRight() {
  console.log('Turning right');
}

// Main program
moveForward(3);
turnRight();
moveForward(2);
turnLeft();
moveForward(1);`);
  
  const [selectedLocation, setSelectedLocation] = useState('default');
  
  const startSimulation = () => {
    setIsSimulating(true);
  };
  
  const stopSimulation = () => {
    setIsSimulating(false);
  };
  
  return (
    <Layout>
      <div className="container py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Robot Simulator</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to the Inspire Bot Simulator. Choose a location, write your code, and test how the robot will behave.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border overflow-hidden h-[500px]">
              <SimulatorScene 
                isSimulating={isSimulating} 
                robotCode={robotCode}
                selectedLocation={selectedLocation}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-2">Simulation Controls</h2>
              <SimulatorControls 
                isSimulating={isSimulating}
                onStartSimulation={startSimulation}
                onStopSimulation={stopSimulation}
                onLocationChange={setSelectedLocation}
                selectedLocation={selectedLocation}
              />
            </div>
            
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-2">Robot Code</h2>
              <textarea
                value={robotCode}
                onChange={(e) => setRobotCode(e.target.value)}
                className="w-full h-64 font-mono text-sm p-3 border rounded bg-background"
              />
              <div className="mt-3 space-x-2">
                <Button onClick={startSimulation} disabled={isSimulating}>
                  Run Code
                </Button>
                <Button variant="outline" onClick={stopSimulation} disabled={!isSimulating}>
                  Stop
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
