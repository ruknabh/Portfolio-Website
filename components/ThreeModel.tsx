"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Helmet() {
  const { scene } = useGLTF("/models/damaged-helmet.glb");

  return (
    <primitive
      object={scene}
      scale={0.8}
      position={[0, 0, 0]}
      rotation={[0, Math.PI * 0.25, 0]}
    />
  );
}

export default function ThreeModel() {
  return (
    <div className="w-full h-125 md:h-137.5 lg:h-150">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={4.0} />
        
        <directionalLight position={[2, 2, 3]} intensity={2.1} castShadow />
        <directionalLight position={[-2, -1, -3]} intensity={1.4} />

        <Helmet />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/damaged-helmet.glb");