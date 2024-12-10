import { inputStream } from "../utils.ts";

const map: number[][] = [];
for await (const line of inputStream) {
  map.push(line.split("").map(Number));
}

function follow(
  [y, x]: [number, number],
  nextHeigh: number,
  found: Map<string, number>
) {
  if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
    return;
  }

  const height = map[y][x];
  if (height !== nextHeigh) {
    return;
  }

  if (height === 9) {
    const key = `${y}_${x}`;
    found.set(key, (found.get(key) ?? 0) + 1);
    return;
  }

  follow([y + 1, x], height + 1, found);
  follow([y - 1, x], height + 1, found);
  follow([y, x + 1], height + 1, found);
  follow([y, x - 1], height + 1, found);
}

let res = 0;
for (let y = 0; y < map.length; y++) {
  const row = map[y];

  for (let x = 0; x < row.length; x++) {
    const height = row[x];
    if (height !== 0) {
      continue;
    }

    const found = new Map<string, number>();
    follow([y, x], 0, found);
    for (const [, count] of found) {
      res += count;
    }
  }
}

console.log(res);
