"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type CameraMode = "drift" | "static";

const WAYPOINTS: [number, number, number][] = [
  [0, 1.0, 11],
  [-1.2, 0.6, 6],
  [1.0, -0.2, 2.2],
];

const LOOK_START = new THREE.Vector3(0, 0, -6);

export default function NetworkCameraRig({
  progressRef,
  mode,
  yourNodePosition,
}: {
  progressRef: React.MutableRefObject<number>;
  mode: CameraMode;
  yourNodePosition: THREE.Vector3;
}) {
  const { camera } = useThree();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        WAYPOINTS.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.5
      ),
    []
  );
  const currentPos = useRef(new THREE.Vector3(...WAYPOINTS[0]));
  const currentLook = useRef(LOOK_START.clone());
  const hasSetStatic = useRef(false);

  useFrame(({ clock }) => {
    if (mode === "static") {
      if (!hasSetStatic.current) {
        camera.position.set(0, 0.6, 8);
        camera.lookAt(LOOK_START);
        hasSetStatic.current = true;
      }
      return;
    }

    const t = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const basePos = curve.getPoint(t);

    // Gentle ambient drift layered on top so the camera never feels static,
    // even while scroll is paused — the "cinematic flight" feel.
    const time = clock.getElapsedTime();
    const driftX = Math.sin(time * 0.15) * 0.12;
    const driftY = Math.cos(time * 0.12) * 0.08;

    const target = basePos.clone().add(new THREE.Vector3(driftX, driftY, 0));
    currentPos.current.lerp(target, 0.05);
    camera.position.copy(currentPos.current);

    const lookTarget = new THREE.Vector3().lerpVectors(LOOK_START, yourNodePosition, t);
    currentLook.current.lerp(lookTarget, 0.05);
    camera.lookAt(currentLook.current);
  });

  return null;
}
