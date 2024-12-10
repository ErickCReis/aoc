import { inputStream } from "../utils.ts";

const map: number[][] = [];
for await (const line of inputStream) {
  map.push(line.split("").map(Number));
}

function follow(
  [y, x]: [number, number],
  nextHeigh: number,
  found: Set<string>
) {
  if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
    return;
  }

  const height = map[y][x];
  if (height !== nextHeigh) {
    return;
  }

  if (height === 9) {
    found.add(`${y}_${x}`);
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

    const found = new Set<string>();
    follow([y, x], 0, found);
    res += found.size;
  }
}

console.log(res);
