export function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export const STATION_COLORS = {
  teal: "#0F766E",
  tealLight: "#7fd6cd",
  ink: "#16242a",
  white: "#f4faf9",
};
