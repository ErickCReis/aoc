import { inputStream } from "../utils.ts";

const robots: {
  p: { x: number; y: number };
  v: { x: number; y: number };
}[] = [];

const MAP_SIZE_X = 101;
const MAP_SIZE_Y = 103;

for await (const line of inputStream) {
  const res = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line)!;
  if (!res) continue;

  const [, x, y, vx, vy] = res;
  robots.push({
    p: { x: +x, y: +y },
    v: { x: +vx, y: +vy },
  });
}

function isTree() {
  const positions = robots.reduce((acc, { p }) => {
    if (!acc[p.y]) {
      acc[p.y] = [];
    }
    acc[p.y].push(p.x);
    return acc;
  }, {} as Record<number, number[]>);

  for (const position of Object.values(positions)) {
    const line = Array.from({ length: MAP_SIZE_X }, () => ".");
    for (const x of position) {
      line[x] = "#";
    }

    if (line.join("").includes("##########")) {
      return true;
    }
  }

  return false;
}

let time = 0;
while (true) {
  if (isTree()) {
    break;
  }

  for (const robot of robots) {
    const x = robot.p.x + robot.v.x;
    robot.p.x = x < 0 ? MAP_SIZE_X + x : x % MAP_SIZE_X;

    const y = robot.p.y + robot.v.y;
    robot.p.y = y < 0 ? MAP_SIZE_Y + y : y % MAP_SIZE_Y;
  }

  time++;
}

const map = [];
for (let i = 0; i < MAP_SIZE_Y; i++) {
  map.push(Array.from({ length: MAP_SIZE_X }, () => "."));
}

for (const { p } of robots) {
  map[p.y][p.x] = "#";
}

for (const line of map) {
  console.log(line.join(""));
}

console.log(time);
