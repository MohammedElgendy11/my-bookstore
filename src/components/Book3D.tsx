import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls } from '@react-three/drei';
import { Group } from 'three';

interface Book3DProps {
  title: string;
  author: string;
  coverColor?: string;
  isHovered?: boolean;
}

function Book3DModel({ title, author, coverColor = '#4a5568', isHovered }: Book3DProps) {
  const meshRef = useRef<Group>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Rotation based on hover state
      if (isHovered && !clicked) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }
  });

  return (
    <group ref={meshRef} onClick={() => setClicked(!clicked)}>
      {/* Book Cover */}
      <Box args={[1.2, 1.8, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={coverColor} />
      </Box>
      
      {/* Book Spine */}
      <Box args={[0.1, 1.8, 0.2]} position={[-0.65, 0, -0.05]}>
        <meshStandardMaterial color={coverColor} />
      </Box>
      
      {/* Pages */}
      <Box args={[1.15, 1.75, 0.15]} position={[0.025, 0, -0.075]}>
        <meshStandardMaterial color="#f7fafc" />
      </Box>
      
      {/* Title Text */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {title}
      </Text>
      
      {/* Author Text */}
      <Text
        position={[0, -0.4, 0.06]}
        fontSize={0.08}
        color="rgba(255,255,255,0.8)"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {author}
      </Text>
    </group>
  );
}

export const Book3D: React.FC<Book3DProps> = (props) => {
  return (
    <div className="w-full h-64 book-3d premium-3d-container">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} shadows>
        {/* Enhanced lighting for premium feel */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffd700" />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={0.5} 
          angle={0.3} 
          penumbra={0.5}
          castShadow
        />
        <Book3DModel {...props} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={props.isHovered}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};