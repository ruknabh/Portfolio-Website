"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Planet ────────────────────────────────────────────────────────────── */
function Planet() {
  const { scene } = useGLTF("/models/lava_planet.glb");

  const pivotRef = useRef<THREE.Group>(null);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  // ── EMISSIVE CONTROL (🔥 main glow driver — keep this balanced)
  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;

        // 🔧 PRIMARY GLOW CONTROL
        if (mat.emissive) mat.emissiveIntensity = 1.25; 
        // sweet spot: 1.0 → 1.4

        mat.needsUpdate = true;
      }
    });
  }, [cloned]);

  // ── ROTATION (slightly slower = less GPU pressure)
  useFrame((_, delta) => {
    if (!pivotRef.current) return;

    // 🔧 ROTATION SPEED
    pivotRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={pivotRef} position={[0, 0, 0]}>
      {/* 🔧 PLANET SIZE */}
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

        // ✅ PERFORMANCE FIXES
        dpr={1} // 🔥 HUGE performance win
        gl={{ antialias: false, alpha: true }} // disable AA for performance
        frameloop="always"

        // ✅ fully transparent canvas (no visible box)
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* ─── LIGHTING (balanced for glow + performance) ─── */}

        {/* Main light */}
        <directionalLight
          position={[-3, 4, 4]}
          intensity={2.2}
          color="#ffd1a3"
        />

        {/* Rim glow light */}
        <directionalLight
          position={[3, -2, -3]}
          intensity={1.2}
          color="#ffb38a"
        />

        {/* Ambient fill */}
        <ambientLight intensity={2.35} color="#fff2e6" />

        {/* 🔥 Glow source (controlled, not extreme) */}
        <pointLight
          position={[1.5, -1.5, 2]}
          intensity={5.5}   // 🔧 increase for more glow
          distance={30}      // 🔧 spread radius
          decay={2}
          color="#ff6a2b"
        />

        <Planet />

        {/* ─── BLOOM (optimized glow) ─── */}
        <EffectComposer>
          <Bloom
            intensity={2.9}            // 🔥 glow strength (safe range)
            luminanceThreshold={0.32}  // isolates lava areas
            luminanceSmoothing={0.25}
            // ❌ removed mipmapBlur (expensive)
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/lava_planet.glb");