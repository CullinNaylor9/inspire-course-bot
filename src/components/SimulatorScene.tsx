
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';

// Simple robot model as a placeholder
function Robot({ position, rotation }: { position: [number, number, number], rotation: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Animation for robot movement
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Robot body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 1.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Robot head */}
      <mesh position={[0, 0.9, 0.5]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      
      {/* Robot wheels */}
      <mesh position={[-0.6, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.6, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.6, 0.2, -0.7]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.6, 0.2, -0.7]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Sensors */}
      <mesh position={[0, 0.6, 0.75]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

// Generate terrain based on selected location
function Terrain({ location }: { location: string }) {
  switch (location) {
    case 'classroom':
      return (
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
          {/* Classroom furniture */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} position={[i * 2 - 4, 0.5, -3]} castShadow>
              <boxGeometry args={[1.5, 1, 0.8]} />
              <meshStandardMaterial color="#d4a373" />
            </mesh>
          ))}
        </group>
      );
    case 'maze':
      return (
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#e9edc9" />
          </mesh>
          {/* Simple maze walls */}
          {[
            [0, 0, -2, 10, 1, 0.5],
            [0, 0, 2, 10, 1, 0.5],
            [-2, 0, 0, 0.5, 1, 4],
            [2, 0, 0, 0.5, 1, 4]
          ].map(([x, y, z, w, h, d], i) => (
            <mesh key={i} position={[x as number, y as number, z as number]} castShadow>
              <boxGeometry args={[w as number, h as number, d as number]} />
              <meshStandardMaterial color="#283618" />
            </mesh>
          ))}
        </group>
      );
    case 'obstacles':
      return (
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#d8f3dc" />
          </mesh>
          {/* Random obstacles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = Math.random() * 10 - 5;
            const z = Math.random() * 10 - 5;
            const size = 0.5 + Math.random() * 0.5;
            return (
              <mesh key={i} position={[x, size / 2, z]} castShadow>
                <boxGeometry args={[size, size, size]} />
                <meshStandardMaterial color="#2d6a4f" />
              </mesh>
            );
          })}
        </group>
      );
    default:
      return (
        <group>
          <Grid
            infiniteGrid
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#4b5563"
            fadeDistance={30}
            fadeStrength={1}
          />
        </group>
      );
  }
}

// Main scene setup
function Scene({ isSimulating, robotCode, selectedLocation }: { 
  isSimulating: boolean; 
  robotCode: string;
  selectedLocation: string;
}) {
  const [robotPosition, setRobotPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [robotRotation, setRobotRotation] = useState<number>(0);
  
  useEffect(() => {
    if (isSimulating) {
      // Simulate robot movement based on code
      // This is a very basic simulation that doesn't actually execute the code
      let timeoutId: NodeJS.Timeout;
      
      const simulateMovement = () => {
        setRobotPosition(prev => {
          // Simple random movement for demo purposes
          const x = prev[0] + (Math.random() * 0.2 - 0.1);
          const z = prev[2] + (Math.random() * 0.2 - 0.1);
          return [x, prev[1], z];
        });
        
        setRobotRotation(prev => prev + (Math.random() * 0.1 - 0.05));
        
        timeoutId = setTimeout(simulateMovement, 100);
      };
      
      simulateMovement();
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSimulating, robotCode]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      <Terrain location={selectedLocation} />
      <Robot position={robotPosition} rotation={robotRotation} />
      
      <OrbitControls 
        makeDefault
        minDistance={2}
        maxDistance={15}
        target={[0, 0, 0]}
      />
      
      {/* Instructions in 3D space */}
      {!isSimulating && (
        <Text
          position={[0, 2, 0]}
          color="black"
          fontSize={0.5}
          maxWidth={10}
          textAlign="center"
        >
          Select a location and press Start to begin simulation
        </Text>
      )}
      
      <Environment preset="sunset" />
    </>
  );
}

interface SimulatorSceneProps {
  isSimulating: boolean;
  robotCode: string;
  selectedLocation: string;
}

export function SimulatorScene({ isSimulating, robotCode, selectedLocation }: SimulatorSceneProps) {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <Scene isSimulating={isSimulating} robotCode={robotCode} selectedLocation={selectedLocation} />
    </Canvas>
  );
}
