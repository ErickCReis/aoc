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

function findPerimeter(regionPlant: string, regionPoints: [number, number][]) {
  let res = 0;

  for (const [y, x] of regionPoints) {
    if (garden[y - 1]?.[x] !== regionPlant) {
      res++;
    }
    if (garden[y + 1]?.[x] !== regionPlant) {
      res++;
    }
    if (garden[y]?.[x - 1] !== regionPlant) {
      res++;
    }
    if (garden[y]?.[x + 1] !== regionPlant) {
      res++;
    }
  }

  return res;
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
    const perimeter = findPerimeter(plant, regionPoints);

    res += area * perimeter;
  }
}

console.log(res);
