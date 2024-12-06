import { inputStream } from "../utils.ts";

const dirs = ["^", ">", "v", "<"] as const;
const nextPos = {
  "^": { y: -1, x: 0, dir: ">" },
  ">": { y: 0, x: +1, dir: "v" },
  v: { y: 1, x: 0, dir: "<" },
  "<": { y: 0, x: -1, dir: "^" },
} as const;

const map: string[] = [];

const guard = {
  y: -1,
  x: -1,
  dir: dirs[0] as (typeof dirs)[number],
};
for await (let line of inputStream) {
  for (const dir of dirs) {
    const guardIndex = line.indexOf(dir);
    if (guardIndex !== -1) {
      guard.y = map.length;
      guard.x = guardIndex;
      guard.dir = dir;
      line = line.replace(dir, ".");
    }
  }

  map.push(line);
}

const visited = new Set<string>();

while (true) {
  const nextInfo = nextPos[guard.dir];

  const nextY = guard.y + nextInfo.y;
  const nextX = guard.x + nextInfo.x;

  const next = map[nextY]?.[nextX];
  if (!next) {
    break;
  }

  if (next === ".") {
    guard.y = nextY;
    guard.x = nextX;
    visited.add(`${nextY}_${nextX}`);
  }

  if (next === "#") {
    guard.dir = nextInfo.dir;
  }
}

console.log(visited.size);
