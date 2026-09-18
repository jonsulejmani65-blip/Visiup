"use client";

import { Canvas } from "@react-three/fiber";
import Beacon from "./Beacon";
import SeoStation from "./stations/SeoStation";
import WebdesignStation from "./stations/WebdesignStation";
import SocialStation from "./stations/SocialStation";
import AiStation from "./stations/AiStation";
import CameraRig, { type CameraMode } from "./CameraRig";
import { STATION_COLORS } from "./utils";

const RADIUS = 3.2;

export default function GrowthSceneCanvas({
  progressRef,
  activeStationIndex,
  tier,
  mode,
}: {
  progressRef: React.MutableRefObject<number>;
  activeStationIndex: number;
  tier: "full" | "reduced";
  mode: CameraMode;
}) {
  const reduced = tier === "reduced";

  return (
    <Canvas
      dpr={[1, reduced ? 1 : 2]}
      gl={{ antialias: !reduced, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, position: [0, 5.5, 9] }}
    >
      <color attach="background" args={[STATION_COLORS.ink]} />
      <fog attach="fog" args={[STATION_COLORS.ink, 10, 22]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, 3, -4]} intensity={0.4} color={STATION_COLORS.tealLight} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow={false}>
        <circleGeometry args={[5.2, reduced ? 32 : 64]} />
        <meshStandardMaterial color="#0f1b1f" roughness={0.9} />
      </mesh>
      <gridHelper args={[10.4, reduced ? 10 : 20, "#1f3a38", "#1a2d2b"]} />

      <Beacon position={[0, 0.9, 0]} />

      <SeoStation position={[RADIUS, 0, 0]} active={activeStationIndex === 0} />
      <WebdesignStation position={[0, 0, RADIUS]} active={activeStationIndex === 1} />
      <SocialStation
        position={[-RADIUS, 0, 0]}
        active={activeStationIndex === 2}
        tileCount={reduced ? 3 : 4}
        particleCount={reduced ? 5 : 10}
      />
      <AiStation position={[0, 0, -RADIUS]} active={activeStationIndex === 3} reduced={reduced} />

      <CameraRig progressRef={progressRef} mode={mode} />
    </Canvas>
  );
}
