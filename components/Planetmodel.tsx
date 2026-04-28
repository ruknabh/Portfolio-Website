"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Detect mobile once ───────────────────────────────────────────────── */
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

/* ─── Planet ────────────────────────────────────────────────────────────── */
function Planet() {
  const { scene } = useGLTF("/models/lava_planet_optimized.glb");

  const pivotRef = useRef<THREE.Group>(null);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.emissive) mat.emissiveIntensity = isMobile ? 1.1 : 1.25;
        mat.needsUpdate = true;
      }
    });
  }, [cloned]);

  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    pivotRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={pivotRef} position={[0, 0, 0]}>
      <primitive object={cloned} scale={1.4} />
    </group>
  );
}

/* ─── Canvas ────────────────────────────────────────────────────────────── */
export default function PlanetModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 38 }}

        // Mobile: further drop DPR to 0.75 for GPU savings
        dpr={isMobile ? 0.75 : 1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"

        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* ─── LIGHTING ─── */}
        <directionalLight
          position={[-3, 4, 4]}
          intensity={isMobile ? 1.8 : 2.2}
          color="#ffd1a3"
        />

        <directionalLight
          position={[3, -2, -3]}
          intensity={isMobile ? 1.0 : 1.2}
          color="#ffb38a"
        />

        <ambientLight intensity={isMobile ? 2.0 : 2.35} color="#fff2e6" />

        <pointLight
          position={[1.5, -1.5, 2]}
          intensity={isMobile ? 4.5 : 5.5}
          distance={30}
          decay={2}
          color="#ff6a2b"
        />

        <Planet />

        {/* ─── BLOOM — lighter on mobile ─── */}
        <EffectComposer>
          <Bloom
            intensity={isMobile ? 2.0 : 2.9}
            luminanceThreshold={0.32}
            luminanceSmoothing={0.25}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
useGLTF.preload("/models/lava_planet_optimized.glb");