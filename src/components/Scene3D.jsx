import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotazione autonoma
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Movimento basato sullo scroll
    const scrollY = window.scrollY;
    meshRef.current.position.y = Math.sin(time) * 0.2 - (scrollY * 0.002);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 15]} />
        <MeshDistortMaterial
          color="#00ffff"
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="scene-container">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" />
        
        <FloatingObject />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
