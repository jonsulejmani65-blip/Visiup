import * as THREE from "three";
import { makeRng } from "./utils";

export type NetworkData = {
  positions: THREE.Vector3[];
  edges: [number, number][];
  yourIndex: number;
  pulsePath: number[];
};

/**
 * Builds a sparse, deterministic 3D point network: nodes spread along the
 * camera's flight depth (z), each connected to its 1-2 nearest neighbours
 * only (kept sparse on purpose — this is meant to read as elegant negative
 * space, not a dense cyberpunk mesh). One node is designated "yourIndex"
 * (the dark, unlit node) and a short BFS path to it is precomputed so the
 * light pulse has somewhere deliberate to travel.
 */
export function generateNetwork(count: number, seed = 7): NetworkData {
  const rng = makeRng(seed);
  const positions: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const x = (rng() - 0.5) * 11;
    const y = (rng() - 0.5) * 6;
    const z = -rng() * 16 + 1.5;
    positions.push(new THREE.Vector3(x, y, z));
  }

  // k-nearest-neighbour edges (k=2), deduplicated, distance-capped.
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  const MAX_DIST = 4.2;

  positions.forEach((p, i) => {
    const distances = positions
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    distances.forEach(({ j, d }) => {
      if (d > MAX_DIST) return;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) return;
      edgeSet.add(key);
      edges.push(i < j ? [i, j] : [j, i]);
    });
  });

  // Adjacency list for BFS.
  const adjacency = new Map<number, number[]>();
  edges.forEach(([a, b]) => {
    if (!adjacency.has(a)) adjacency.set(a, []);
    if (!adjacency.has(b)) adjacency.set(b, []);
    adjacency.get(a)!.push(b);
    adjacency.get(b)!.push(a);
  });

  // The "your business" node: closest to a forward, slightly off-centre
  // anchor point, echoing the offset "YOUR BUSINESS" pin in the reference.
  const anchor = new THREE.Vector3(1.4, -0.4, -3);
  let yourIndex = 0;
  let bestDist = Infinity;
  positions.forEach((p, i) => {
    const d = p.distanceTo(anchor);
    if (d < bestDist) {
      bestDist = d;
      yourIndex = i;
    }
  });

  // BFS from yourIndex to find a node ~2-3 hops away for a short, legible
  // pulse path (falls back to the nearest direct neighbour if the graph
  // is too sparse around this node).
  const parent = new Map<number, number>();
  const visited = new Set<number>([yourIndex]);
  const queue: { node: number; depth: number }[] = [{ node: yourIndex, depth: 0 }];
  let target: number | null = null;

  while (queue.length) {
    const { node, depth } = queue.shift()!;
    if (depth >= 2 && depth <= 3 && target === null) {
      target = node;
    }
    if (target !== null) break;
    const neighbours = adjacency.get(node) ?? [];
    for (const n of neighbours) {
      if (!visited.has(n)) {
        visited.add(n);
        parent.set(n, node);
        queue.push({ node: n, depth: depth + 1 });
      }
    }
  }

  let pulsePath: number[] = [yourIndex];
  if (target !== null) {
    const path: number[] = [target];
    let cur = target;
    while (parent.has(cur)) {
      cur = parent.get(cur)!;
      path.push(cur);
    }
    pulsePath = path.reverse();
  } else {
    const directNeighbour = adjacency.get(yourIndex)?.[0];
    if (directNeighbour !== undefined) pulsePath = [directNeighbour, yourIndex];
  }

  return { positions, edges, yourIndex, pulsePath };
}
