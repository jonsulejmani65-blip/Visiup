"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, STATION_COLORS } from "../utils";

const NODES_FULL: [number, number, number][] = [
  [0, 1.4, 0],
  [0.55, 1.0, 0.3],
  [-0.5, 0.95, -0.25],
  [0.2, 0.55, -0.45],
  [-0.35, 0.5, 0.4],
];
const NODES_REDUCED: [number, number, number][] = [
  [0, 1.4, 0],
  [0.5, 0.9, 0.2],
  [-0.4, 0.7, -0.2],
];

const EDGES_FULL: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];
const EDGES_REDUCED: [number, number][] = [
  [0, 1],
  [0, 2],
];

export default function AiStation({
  position = [0, 0, 0] as [number, number, number],
  active = false,
  reduced = false,
}: {
  position?: [number, number, number];
  active?: boolean;
  reduced?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const emphasisRef = useRef(0);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const sparksRef = useRef<THREE.Mesh[]>([]);
  const gearsRef = useRef<THREE.Mesh[]>([]);

  const nodes = reduced ? NODES_REDUCED : NODES_FULL;
  const edges = reduced ? EDGES_REDUCED : EDGES_FULL;

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    edges.forEach(([a, b]) => {
      points.push(new THREE.Vector3(...nodes[a]), new THREE.Vector3(...nodes[b]));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    emphasisRef.current = lerp(emphasisRef.current, active ? 1 : 0, 0.06);
    const e = emphasisRef.current;

    if (groupRef.current) groupRef.current.scale.setScalar(1 + e * 0.12);

    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const bob = Math.sin(t * 1.3 + i) * 0.03;
      node.position.y = nodes[i][1] + bob;
      const material = node.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.35 + e * 1.0;
    });

    gearsRef.current.forEach((gear, i) => {
      if (!gear) return;
      gear.rotation.z += (0.01 + e * 0.02) * (i % 2 === 0 ? 1 : -1);
    });

    sparksRef.current.forEach((spark, i) => {
      if (!spark) return;
      const [a, b] = edges[i % edges.length];
      const progress = (t * (0.5 + e * 0.6) + i * 0.5) % 1;
      const from = new THREE.Vector3(...nodes[a]);
      const to = new THREE.Vector3(...nodes[b]);
      spark.position.lerpVectors(from, to, progress);
    });
  });

  return (
    <group ref={groupRef} position={position}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={STATION_COLORS.tealLight} transparent opacity={0.5} />
      </lineSegments>

      {nodes.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
          position={pos}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={STATION_COLORS.teal}
            emissive={STATION_COLORS.tealLight}
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </mesh>
      ))}

      {edges.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) sparksRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={STATION_COLORS.white} />
        </mesh>
      ))}

      {[0.7, -0.6].map((x, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) gearsRef.current[i] = el;
          }}
          position={[x, 0.35, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.16, 0.045, 6, 8]} />
          <meshStandardMaterial color={STATION_COLORS.ink} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
