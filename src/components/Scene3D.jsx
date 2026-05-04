import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotazione autonoma
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;
    
    // Movimento basato sullo scroll (RIDOTTO come richiesto)
    const scrollY = window.scrollY;
    // Usiamo un fattore molto più piccolo (0.0008) per evitare che sparisca
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3 - (scrollY * 0.0008);
    meshRef.current.position.x = Math.cos(time * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 10]} />
        <MeshDistortMaterial
          color="#00e5ff"
          speed={2}
          distort={0.3}
          radius={1}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const WindParticles = ({ count = 1000 }) => {
  const pointsRef = useRef();

  // Genera posizioni casuali per le particelle
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Effetto vento: movimento da sinistra a destra
    for (let i = 0; i < count; i++) {
      let x = pointsRef.current.geometry.attributes.position.array[i * 3];
      x += 0.02; // Velocità del vento
      if (x > 10) x = -10; // Reset quando esce a destra
      pointsRef.current.geometry.attributes.position.array[i * 3] = x;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Leggera oscillazione verticale
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Scene3D = () => {
  return (
    <div className="scene-container">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#00e5ff" intensity={0.5} />
        
        <FloatingObject />
        <WindParticles count={1500} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
