"use client";

import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import NetworkField from "./NetworkField";
import Pulse from "./Pulse";
import NetworkCameraRig, { type CameraMode } from "./NetworkCameraRig";
import { generateNetwork } from "./networkData";
import { PALETTE } from "./utils";

const PULSE_RANGE: [number, number] = [0.68, 0.9];

export default function NetworkCanvas({
  progressRef,
  tier,
  mode,
}: {
  progressRef: React.MutableRefObject<number>;
  tier: "full" | "reduced";
  mode: CameraMode;
}) {
  const nodeCount = tier === "reduced" ? 30 : 60;
  const [network, setNetwork] = useState<ReturnType<typeof generateNetwork> | null>(null);

  const handleNetwork = useCallback((data: ReturnType<typeof generateNetwork>) => {
    setNetwork(data);
  }, []);

  const yourNodePosition = network
    ? network.positions[network.yourIndex]
    : new THREE.Vector3(0, 0, -3);

  const pulsePath = network ? network.pulsePath.map((i) => network.positions[i]) : [];

  return (
    <Canvas
      dpr={[1, tier === "reduced" ? 1 : 2]}
      gl={{ antialias: tier !== "reduced", alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 1, 11] }}
    >
      <color attach="background" args={[PALETTE.ink]} />
      <fog attach="fog" args={[PALETTE.ink, 6, 19]} />

      <NetworkField nodeCount={nodeCount} progressRef={progressRef} onNetwork={handleNetwork} />
      {pulsePath.length > 1 && (
        <Pulse path={pulsePath} progressRef={progressRef} range={PULSE_RANGE} />
      )}
      <NetworkCameraRig progressRef={progressRef} mode={mode} yourNodePosition={yourNodePosition} />
    </Canvas>
  );
}
