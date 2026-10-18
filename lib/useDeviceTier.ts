"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "full" | "reduced" | "off";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function classifyDevice(): DeviceTier {
  if (typeof window === "undefined") return "off";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return "off";

  if (!detectWebGL()) return "off";

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const isSmallScreen = window.innerWidth < 768;
  const isTabletScreen = window.innerWidth < 1024;

  // Small phones with few cores/little memory: skip WebGL entirely.
  const isWeak = isSmallScreen && (cores <= 4 || (memory ?? 8) <= 4);
  if (isWeak) return "off";

  // Tablets, or any device that reports very few cores: simplified scene.
  const isModest = isTabletScreen || cores <= 2 || (memory ?? 8) <= 2;
  if (isModest) return "reduced";

  return "full";
}

/**
 * Detects a rough device performance tier once on mount. Returns null
 * until detection completes, so callers can render the safe static
 * fallback until then and avoid a hydration mismatch.
 */
export function useDeviceTier(): DeviceTier | null {
  const [tier, setTier] = useState<DeviceTier | null>(null);

  useEffect(() => {
    setTier(classifyDevice());
  }, []);

  return tier;
}
