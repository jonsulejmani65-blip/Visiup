"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, STATION_COLORS } from "../utils";

export default function SocialStation({
  position = [0, 0, 0] as [number, number, number],
  active = false,
  tileCount = 4,
  particleCount = 10,
}: {
  position?: [number, number, number];
  active?: boolean;
  tileCount?: number;
  particleCount?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const emphasisRef = useRef(0);
  const tilesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const bellRef = useRef<THREE.Mesh>(null);
  const phoneRef = useRef<THREE.Mesh>(null);

  const tiles = Array.from({ length: tileCount });
  const particles = Array.from({ length: particleCount });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    emphasisRef.current = lerp(emphasisRef.current, active ? 1 : 0, 0.06);
    const e = emphasisRef.current;

    if (groupRef.current) groupRef.current.scale.setScalar(1 + e * 0.12);

    tilesRef.current.forEach((tile, i) => {
      if (!tile) return;
      const angle = (i / tileCount) * Math.PI * 2 + t * (0.3 + e * 0.4);
      const radius = 0.85;
      tile.position.set(Math.cos(angle) * radius, 0.9 + Math.sin(angle * 2) * 0.1, Math.sin(angle) * radius);
      tile.lookAt(0, 0.9, 0);
    });

    particlesRef.current.forEach((p, i) => {
      if (!p) return;
      const speed = 0.4 + (i % 3) * 0.15;
      const cycle = (t * speed + i * 0.37) % 2;
      p.position.y = 0.4 + cycle * 1.1;
      const material = p.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.8 - cycle * 0.6) * (0.4 + e * 0.6);
      p.position.x = Math.sin(t * 0.8 + i) * 0.3;
    });

    if (bellRef.current) {
      const blink = (Math.sin(t * 6) + 1) / 2;
      const material = bellRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + blink * (0.6 + e * 1.2);
    }

    if (phoneRef.current) {
      phoneRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={phoneRef} position={[0, 0.9, 0]}>
        <boxGeometry args={[0.42, 0.8, 0.06]} />
        <meshStandardMaterial color={STATION_COLORS.ink} roughness={0.4} />
      </mesh>

      {tiles.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) tilesRef.current[i] = el;
          }}
        >
          <boxGeometry args={[0.34, 0.34, 0.03]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? STATION_COLORS.tealLight : STATION_COLORS.teal}
            roughness={0.35}
          />
        </mesh>
      ))}

      {particles.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
          }}
        >
          <octahedronGeometry args={[0.05, 0]} />
          <meshBasicMaterial color={STATION_COLORS.tealLight} transparent opacity={0.6} />
        </mesh>
      ))}

      <mesh ref={bellRef} position={[0.55, 1.55, 0.05]}>
        <coneGeometry args={[0.1, 0.16, 12]} />
        <meshStandardMaterial
          color={STATION_COLORS.white}
          emissive={STATION_COLORS.tealLight}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
