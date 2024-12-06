import { inputStream } from "../utils.ts";

const dirs = ["^", ">", "v", "<"] as const;
const nextPos = {
  "^": { y: -1, x: 0, dir: ">" },
  ">": { y: 0, x: +1, dir: "v" },
  v: { y: 1, x: 0, dir: "<" },
  "<": { y: 0, x: -1, dir: "^" },
} as const;

const map: string[][] = [];

let guard = {
  y: -1,
  x: -1,
  dir: dirs[0] as (typeof dirs)[number],
};
for await (let line of inputStream) {
  for (const dir of dirs) {
    const guardIndex = line.indexOf(dir);
    if (guardIndex !== -1) {
      guard = {
        y: map.length,
        x: guardIndex,
        dir,
      };
      line = line.replace(dir, ".");
    }
  }

  map.push(line.split(""));
}

const guardStart = { ...guard };

const orginalPath = new Set<string>();
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
    orginalPath.add(`${nextY}_${nextX}`);
  }

  if (next === "#") {
    guard.dir = nextInfo.dir;
  }
}

let res = 0;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const point = map[y][x];
    if (point === "#") {
      continue;
    }

    if (!orginalPath.has(`${y}_${x}`)) {
      continue;
    }

    guard = { ...guardStart };
    const visited = new Set<string>();

    let stuck = false;
    map[y][x] = "#";

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

        const key = `${nextY}_${nextX}_${nextInfo.dir}`;
        if (visited.has(key)) {
          stuck = true;
          break;
        }
        visited.add(key);
      }

      if (next === "#") {
        guard.dir = nextInfo.dir;
      }
    }

    if (stuck) {
      res++;
    }
    map[y][x] = ".";
  }
}

console.log(res);
