"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, STATION_COLORS } from "../utils";

const BAR_HEIGHTS = [0.6, 1.1, 0.85, 1.6, 1.3];

export default function SeoStation({
  position = [0, 0, 0] as [number, number, number],
  active = false,
}: {
  position?: [number, number, number];
  active?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Group>(null);
  const emphasisRef = useRef(0);
  const barsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    emphasisRef.current = lerp(emphasisRef.current, active ? 1 : 0, 0.06);
    const e = emphasisRef.current;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + e * 0.12);
    }

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const base = BAR_HEIGHTS[i];
      const grown = base * (1 + e * 0.35);
      const wobble = Math.sin(t * 1.5 + i) * 0.02;
      bar.scale.y = grown + wobble;
      bar.position.y = (grown + wobble) / 2;
      const material = bar.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + e * 0.9;
    });

    if (glassRef.current) {
      glassRef.current.position.x = Math.sin(t * 0.6) * 0.9;
      glassRef.current.position.y = 1.9 + Math.sin(t * 1.2) * 0.08;
      glassRef.current.rotation.z = Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {BAR_HEIGHTS.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) barsRef.current[i] = el;
          }}
          position={[(i - (BAR_HEIGHTS.length - 1) / 2) * 0.32, h / 2, 0]}
        >
          <boxGeometry args={[0.22, h, 0.22]} />
          <meshStandardMaterial
            color={STATION_COLORS.teal}
            emissive={STATION_COLORS.tealLight}
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}

      <group ref={glassRef} position={[0, 1.9, 0.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.05, 16, 32]} />
          <meshStandardMaterial color={STATION_COLORS.white} roughness={0.3} />
        </mesh>
        <mesh position={[0.24, -0.24, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          <meshStandardMaterial color={STATION_COLORS.white} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
