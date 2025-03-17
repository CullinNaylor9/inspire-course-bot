
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SimulatorControlsProps {
  isSimulating: boolean;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  onLocationChange: (location: string) => void;
  selectedLocation: string;
}

export function SimulatorControls({
  isSimulating,
  onStartSimulation,
  onStopSimulation,
  onLocationChange,
  selectedLocation
}: SimulatorControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Select Location</Label>
        <Select
          value={selectedLocation}
          onValueChange={onLocationChange}
          disabled={isSimulating}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Terrain</SelectItem>
            <SelectItem value="classroom">Classroom</SelectItem>
            <SelectItem value="maze">Maze Course</SelectItem>
            <SelectItem value="obstacles">Obstacle Course</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Simulation</Label>
        <div className="flex space-x-2">
          <Button
            onClick={onStartSimulation}
            disabled={isSimulating}
            className="flex-1"
          >
            Start
          </Button>
          <Button
            onClick={onStopSimulation}
            disabled={!isSimulating}
            variant="outline"
            className="flex-1"
          >
            Stop
          </Button>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <h3 className="font-medium mb-2">Quick Commands:</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" disabled={isSimulating}>
            Forward
          </Button>
          <Button variant="outline" size="sm" disabled={isSimulating}>
            Backward
          </Button>
          <Button variant="outline" size="sm" disabled={isSimulating}>
            Turn Left
          </Button>
          <Button variant="outline" size="sm" disabled={isSimulating}>
            Turn Right
          </Button>
        </div>
      </div>
    </div>
  );
}
