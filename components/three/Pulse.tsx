"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { clamp01, PALETTE } from "./utils";

function pointAlongPath(path: THREE.Vector3[], cumulative: number[], t: number) {
  const total = cumulative[cumulative.length - 1];
  const target = t * total;
  let segment = 0;
  while (segment < cumulative.length - 1 && cumulative[segment + 1] < target) {
    segment++;
  }
  const segStart = cumulative[segment];
  const segEnd = cumulative[segment + 1] ?? segStart;
  const segT = segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;
  return new THREE.Vector3().lerpVectors(path[segment], path[segment + 1] ?? path[segment], segT);
}

export default function Pulse({
  path,
  progressRef,
  range,
}: {
  path: THREE.Vector3[];
  progressRef: React.MutableRefObject<number>;
  range: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const cumulative = useMemo(() => {
    const dists = [0];
    for (let i = 1; i < path.length; i++) {
      dists.push(dists[i - 1] + path[i - 1].distanceTo(path[i]));
    }
    return dists;
  }, [path]);

  useFrame(() => {
    if (!meshRef.current || path.length < 2) return;
    const [start, end] = range;
    const t = clamp01((progressRef.current - start) / (end - start));
    const visible = t > 0.001 && t < 0.999;
    meshRef.current.visible = visible;
    if (!visible) return;

    const pos = pointAlongPath(path, cumulative, t);
    meshRef.current.position.copy(pos);
    const fade = Math.sin(Math.PI * t); // fades in, brightest mid-flight, fades near arrival
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 + fade * 0.5;
    meshRef.current.scale.setScalar(0.7 + fade * 0.6);
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color={PALETTE.white} transparent opacity={1} />
    </mesh>
  );
}
