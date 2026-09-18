export function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export const PALETTE = {
  ink: "#16242a",
  inkDeep: "#0d1518",
  teal: "#0F766E",
  tealLight: "#7fd6cd",
  white: "#f4faf9",
};

// Simple deterministic PRNG (mulberry32) so the network layout is stable
// across re-renders within a session without needing to store it in state.
export function makeRng(seed: number) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
