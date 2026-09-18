"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateNetwork } from "./networkData";
import { clamp01, lerp, PALETTE } from "./utils";

const dummy = new THREE.Object3D();
const LIT_START = 0.85;

export default function NetworkField({
  nodeCount,
  progressRef,
  onNetwork,
}: {
  nodeCount: number;
  progressRef: React.MutableRefObject<number>;
  onNetwork?: (data: ReturnType<typeof generateNetwork>) => void;
}) {
  const network = useMemo(() => generateNetwork(nodeCount), [nodeCount]);
  const litNodePositions = useMemo(
    () => network.positions.filter((_, i) => i !== network.yourIndex),
    [network]
  );

  const coreRef = useRef<THREE.InstancedMesh>(null);
  const haloRef = useRef<THREE.InstancedMesh>(null);
  const yourCoreRef = useRef<THREE.Mesh>(null);
  const yourHaloRef = useRef<THREE.Mesh>(null);
  const litEmphasisRef = useRef(0);

  useLayoutEffect(() => {
    onNetwork?.(network);
  }, [network, onNetwork]);

  useLayoutEffect(() => {
    if (!coreRef.current || !haloRef.current) return;
    litNodePositions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      coreRef.current!.setMatrixAt(i, dummy.matrix);
      haloRef.current!.setMatrixAt(i, dummy.matrix);
    });
    coreRef.current.instanceMatrix.needsUpdate = true;
    haloRef.current.instanceMatrix.needsUpdate = true;
  }, [litNodePositions]);

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    network.edges.forEach(([a, b]) => {
      points.push(network.positions[a], network.positions[b]);
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [network]);

  useFrame(() => {
    const target = clamp01((progressRef.current - LIT_START) / (1 - LIT_START));
    litEmphasisRef.current = lerp(litEmphasisRef.current, target, 0.05);
    const e = litEmphasisRef.current;

    if (yourCoreRef.current) {
      const mat = yourCoreRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(PALETTE.inkDeep).lerp(new THREE.Color(PALETTE.tealLight), e);
    }
    if (yourHaloRef.current) {
      const mat = yourHaloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 * e;
      yourHaloRef.current.scale.setScalar(1 + e * 0.6);
    }
  });

  const yourPos = network.positions[network.yourIndex];

  return (
    <group>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={PALETTE.tealLight} transparent opacity={0.18} />
      </lineSegments>

      <instancedMesh ref={coreRef} args={[undefined, undefined, litNodePositions.length]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color={PALETTE.tealLight} />
      </instancedMesh>
      <instancedMesh ref={haloRef} args={[undefined, undefined, litNodePositions.length]}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshBasicMaterial
          color={PALETTE.tealLight}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </instancedMesh>

      <mesh ref={yourCoreRef} position={yourPos}>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial color={PALETTE.inkDeep} />
      </mesh>
      <mesh ref={yourHaloRef} position={yourPos}>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshBasicMaterial
          color={PALETTE.tealLight}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
