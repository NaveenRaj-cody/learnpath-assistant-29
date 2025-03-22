
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GraduationCapWithDiploma = ({ position, rotationSpeed = 0.01, scale = 1 }) => {
  const group = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useFrame(() => {
    if (group.current) {
      // Smoother, more controlled rotation
      group.current.rotation.y += rotationSpeed * 0.8;
      group.current.rotation.x += rotationSpeed * 0.2;
      group.current.rotation.z += rotationSpeed * 0.05;
      
      // More subtle floating motion
      group.current.position.y = position[1] + Math.sin(Date.now() * 0.0008) * 0.15;
    }
  });

  return (
    <group position={position} ref={group} scale={scale}>
      {/* Cap Base - Cylindrical part with shadow */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#0f172a" : "#1e3a8a"} 
          transparent
          opacity={0.8}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Cap Top - Square part with shadow */}
      <mesh position={[0, 0.25, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.1, 1.8]} />
        <meshStandardMaterial 
          color={isDark ? "#0f172a" : "#1e3a8a"} 
          transparent
          opacity={0.8}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Tassel Button */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color={isDark ? "#0f172a" : "#0d2b76"} />
      </mesh>
      
      {/* Tassel String */}
      <mesh position={[0.6, 0.1, 0.6]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color={isDark ? "#f59e0b" : "#fbbf24"} />
      </mesh>
      
      {/* Tassel End */}
      <mesh position={[0.6, -0.3, 0.6]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
        <meshStandardMaterial color={isDark ? "#1e3a8a" : "#1e40af"} />
      </mesh>
      
      {/* Diploma */}
      <group position={[1.5, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        {/* Diploma Scroll with improved material */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 16, 1, true]} />
          <meshStandardMaterial 
            color={isDark ? "#fef3c7" : "#fef9c3"} 
            side={THREE.DoubleSide} 
            transparent
            opacity={0.9}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Diploma End Caps */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color={isDark ? "#fef3c7" : "#fef9c3"} />
        </mesh>
        
        <mesh position={[0, -0.6, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color={isDark ? "#fef3c7" : "#fef9c3"} />
        </mesh>
        
        {/* Diploma Ribbon */}
        <mesh position={[0, 0, 0]} castShadow>
          <torusGeometry args={[0.25, 0.05, 16, 100, Math.PI * 0.5]} />
          <meshStandardMaterial color={isDark ? "#dc2626" : "#ef4444"} />
        </mesh>
      </group>
    </group>
  );
};

const FloatingGraduationItems = () => {
  // Reduced number of objects and better positioning for cleaner appearance
  const items = Array.from({ length: 6 }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 - 10 // Push items further back to reduce text overlap
    ],
    speed: Math.random() * 0.008 + 0.001, // Slower, more subtle movement
    scale: Math.random() * 0.5 + 0.6 // Varied sizes for depth perception
  }));

  return (
    <>
      {items.map((item, i) => (
        <GraduationCapWithDiploma 
          key={i} 
          position={item.position} 
          rotationSpeed={item.speed}
          scale={item.scale}
        />
      ))}
    </>
  );
};

// Updated to remove the white background planes
const ThreeDBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 55 }} // Narrower FOV for less distortion
        shadows
        dpr={[1, 2]} // Optimize rendering for different device pixel ratios
        gl={{ 
          antialias: true,
          alpha: true, 
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true, // Helps with z-fighting
          powerPreference: "high-performance" // Request better performance
        }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isDark ? 0.5 : 0.7}
          color={isDark ? "#8b5cf6" : "#ffffff"}
          castShadow
          shadow-mapSize={[512, 512]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 50]} />
        </directionalLight>
        
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={isDark ? 0.2 : 0.4} 
          color={isDark ? "#4c1d95" : "#c4b5fd"} 
        />
        
        {/* Removed the BackgroundPlanes component entirely */}
        <FloatingGraduationItems />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3} // Slower rotation for smoother effect
          rotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.8} // Limit rotation for better visuals
          minPolarAngle={Math.PI / 2.5}
        />
        
        <fog attach="fog" args={[isDark ? "#020617" : "#f8fafc", 10, 30]} />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
