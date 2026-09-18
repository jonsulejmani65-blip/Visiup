"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LOOK_TARGET = new THREE.Vector3(0, 0.95, 0);

const WAYPOINTS: [number, number, number][] = [
  [0, 5.5, 9], // overview
  [6, 2.4, 0], // seo (angle 0)
  [0, 2.4, 6], // webdesign (angle 90)
  [-6, 2.4, 0], // social (angle 180)
  [0, 2.4, -6], // ai (angle 270)
];

export type CameraMode = "scroll" | "static";

export default function CameraRig({
  progressRef,
  mode,
}: {
  progressRef: React.MutableRefObject<number>;
  mode: CameraMode;
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
  const hasSetStatic = useRef(false);

  useFrame(() => {
    if (mode === "static") {
      if (!hasSetStatic.current) {
        camera.position.set(0, 4.6, 7.5);
        camera.lookAt(LOOK_TARGET);
        hasSetStatic.current = true;
      }
      return;
    }

    const target = curve.getPoint(THREE.MathUtils.clamp(progressRef.current, 0, 1));
    currentPos.current.lerp(target, 0.08);
    camera.position.copy(currentPos.current);
    camera.lookAt(LOOK_TARGET);
  });

  return null;
}

export function getActiveStationIndex(progress: number): number {
  if (progress < 0.125) return -1;
  if (progress < 0.375) return 0;
  if (progress < 0.625) return 1;
  if (progress < 0.875) return 2;
  return 3;
}
