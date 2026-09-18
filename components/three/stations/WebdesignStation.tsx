"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, STATION_COLORS } from "../utils";

const LAYER_COUNT = 4;
const CHIP_COLORS = ["#0F766E", "#7fd6cd", "#16242a", "#f4faf9"];

export default function WebdesignStation({
  position = [0, 0, 0] as [number, number, number],
  active = false,
}: {
  position?: [number, number, number];
  active?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const emphasisRef = useRef(0);
  const layersRef = useRef<THREE.Mesh[]>([]);
  const chipsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    emphasisRef.current = lerp(emphasisRef.current, active ? 1 : 0, 0.06);
    const e = emphasisRef.current;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + e * 0.1);
    }

    layersRef.current.forEach((layer, i) => {
      if (!layer) return;
      const spread = lerp(0.04, 0.22, e);
      layer.position.z = i * spread;
      const material = layer.material as THREE.MeshStandardMaterial;
      material.opacity = 0.55 + (i / LAYER_COUNT) * 0.45;
      material.emissiveIntensity = 0.2 + e * 0.6;
    });

    chipsRef.current.forEach((chip, i) => {
      if (!chip) return;
      chip.position.y = 0.15 + Math.sin(t * 1.4 + i) * 0.05;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* browser frame */}
      <mesh position={[0, 0.95, -0.3]}>
        <boxGeometry args={[1.7, 1.15, 0.05]} />
        <meshStandardMaterial color={STATION_COLORS.ink} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.44, -0.27]}>
        <boxGeometry args={[1.7, 0.16, 0.02]} />
        <meshStandardMaterial color={STATION_COLORS.teal} roughness={0.4} />
      </mesh>

      {Array.from({ length: LAYER_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) layersRef.current[i] = el;
          }}
          position={[0, 0.85, i * 0.04]}
        >
          <planeGeometry args={[1.4, 0.85]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? STATION_COLORS.tealLight : STATION_COLORS.white}
            emissive={STATION_COLORS.teal}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {CHIP_COLORS.map((color, i) => (
        <mesh
          key={color}
          ref={(el) => {
            if (el) chipsRef.current[i] = el;
          }}
          position={[1.1 + (i % 2) * 0.32, 0.15, 0.3 - Math.floor(i / 2) * 0.32]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
