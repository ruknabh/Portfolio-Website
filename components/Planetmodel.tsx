"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Planet ────────────────────────────────────────────────────────────── */
function Planet() {
  const { scene } = useGLTF("/models/lava_planet.glb");

  const pivotRef = useRef<THREE.Group>(null);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  // enhance emissive
  useEffect(() => {
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.emissive) mat.emissiveIntensity = 1.8;
        mat.needsUpdate = true;
      }
    });
  }, [cloned]);

  // Pure Y-axis rotation around the planet's own centre
  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    pivotRef.current.rotation.y += delta * 0.12;
  });

  return (
    /*
      Position the planet at world origin (0, 0, 0).
      The camera is pulled back along Z so the planet fills the canvas.
      The container div in Hero.tsx is then shifted 70% off-screen to the
      right using CSS transform, so only the left ~30% arc is visible.
      OrbitControls.target stays at (0, 0, 0) — the true planet centre —
      so rotation always spins correctly around the visible arc.
    */
    <group ref={pivotRef} position={[0, 0, 0]}>
      <primitive object={cloned} scale={1.4} />                                          {/* Use to toggle the size of the planet*/}
    </group>
  );
}

/* ─── Canvas ────────────────────────────────────────────────────────────── */
export default function PlanetModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* lighting */}
        <directionalLight position={[-4, 4, 4]} intensity={2.5} color="#ffd1a3" />
        <directionalLight position={[2, -1, -2]} intensity={0.5} />
        <ambientLight intensity={0.4} color="#fff2e6" />
        <pointLight position={[1, -2, 2]} intensity={4} color="#ff6a2b" />

        <Planet />

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.25} />
        </EffectComposer>

        {/*
          target=[0,0,0] — matches the planet's world position.
          Rotation will orbit correctly around the planet centre even though
          only the left arc is visible on screen.
        */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/lava_planet.glb");