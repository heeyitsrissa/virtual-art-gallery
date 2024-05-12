import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { AmbientLight, PointLight } from 'three';
import Room from './Room';
import CameraControls from './CameraControls'; // This will handle forward and backward movement

function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 1, 2], fov: 75 }}>
        <ambientLight intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 1, 0]} intensity={1300} color="#ffffff" />
        <Room />
        <CameraControls />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}

export default App;