import { inputStream } from "../utils.ts";

const garden: string[][] = [];
for await (const line of inputStream) {
  garden.push(line.split(""));
}

const visited = new Set<string>();
function findRegion(
  [y, x]: [number, number],
  regionPlant: string,
  regionPoints: [number, number][]
) {
  const key = `${y}_${x}`;
  if (visited.has(key)) {
    return;
  }

  const plant = garden[y]?.[x];
  if (plant !== regionPlant) {
    return;
  }

  visited.add(key);
  regionPoints.push([y, x]);

  findRegion([y - 1, x], regionPlant, regionPoints);
  findRegion([y + 1, x], regionPlant, regionPoints);
  findRegion([y, x - 1], regionPlant, regionPoints);
  findRegion([y, x + 1], regionPlant, regionPoints);
}

function countFences(regionPlant: string, regionPoints: [number, number][]) {
  const fences: Record<string, Record<string, number[]>> = {
    top: {},
    bottom: {},
    left: {},
    right: {},
  };

  for (const [y, x] of regionPoints) {
    if (garden[y - 1]?.[x] !== regionPlant) {
      if (!fences.top[y]) {
        fences.top[y] = [];
      }

      fences.top[y].push(x);
    }
    if (garden[y + 1]?.[x] !== regionPlant) {
      if (!fences.bottom[y]) {
        fences.bottom[y] = [];
      }

      fences.bottom[y].push(x);
    }
    if (garden[y]?.[x - 1] !== regionPlant) {
      if (!fences.left[x]) {
        fences.left[x] = [];
      }

      fences.left[x].push(y);
    }
    if (garden[y]?.[x + 1] !== regionPlant) {
      if (!fences.right[x]) {
        fences.right[x] = [];
      }

      fences.right[x].push(y);
    }
  }

  let seqments = 0;

  for (const side in fences) {
    for (const y in fences[side]) {
      fences[side][y].sort((a, b) => a - b);

      let lines = 1;
      for (let i = 1; i < fences[side][y].length; i++) {
        const curr = fences[side][y][i];
        const prev = fences[side][y][i - 1];

        if (curr - prev > 1) {
          lines++;
        }
      }

      seqments += lines;
    }
  }

  return seqments;
}

let res = 0;
for (let y = 0; y < garden.length; y++) {
  for (let x = 0; x < garden[y].length; x++) {
    const plant = garden[y][x];

    const regionPoints: [number, number][] = [];
    findRegion([y, x], plant, regionPoints);
    if (regionPoints.length === 0) {
      continue;
    }

    const area = regionPoints.length;
    const fences = countFences(plant, regionPoints);

    res += area * fences;
  }
}

console.log(res);
