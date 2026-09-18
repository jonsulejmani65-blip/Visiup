"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_COUNT = 3;

export default function Beacon({ position = [0, 0, 0] as [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      coreRef.current.scale.setScalar(pulse);
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.4 + Math.sin(t * 2) * 0.5;
    }

    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (t * 0.5 + i / RING_COUNT) % 1;
      const scale = 0.6 + phase * 3.2;
      ring.scale.setScalar(scale);
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.5 * (1 - phase));
    });
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#0F766E"
          emissive="#7fd6cd"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
      <pointLight color="#7fd6cd" intensity={6} distance={8} decay={2} />

      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) ringsRef.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.7, 0.78, 48]} />
          <meshBasicMaterial
            color="#7fd6cd"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
