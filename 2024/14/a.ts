import { inputStream } from "../utils.ts";

const robots: {
  p: { x: number; y: number };
  v: { x: number; y: number };
}[] = [];

const MAP_SIZE_X = 101;
const MAP_SIZE_Y = 103;
const TIME = 100;

for await (const line of inputStream) {
  const res = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line)!;
  if (!res) continue;

  const [, x, y, vx, vy] = res;
  robots.push({
    p: { x: +x, y: +y },
    v: { x: +vx, y: +vy },
  });
}

for (let i = 0; i < TIME; i++) {
  for (const robot of robots) {
    const x = robot.p.x + robot.v.x;
    robot.p.x = x < 0 ? MAP_SIZE_X + x : x % MAP_SIZE_X;

    const y = robot.p.y + robot.v.y;
    robot.p.y = y < 0 ? MAP_SIZE_Y + y : y % MAP_SIZE_Y;
  }
}

const quad = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

for (const { p } of robots) {
  if (p.x < (MAP_SIZE_X - 1) / 2 && p.y < (MAP_SIZE_Y - 1) / 2) {
    quad[1]++;
    continue;
  }

  if (p.x > (MAP_SIZE_X - 1) / 2 && p.y < (MAP_SIZE_Y - 1) / 2) {
    quad[2]++;
    continue;
  }

  if (p.x < (MAP_SIZE_X - 1) / 2 && p.y > (MAP_SIZE_Y - 1) / 2) {
    quad[3]++;
    continue;
  }

  if (p.x > (MAP_SIZE_X - 1) / 2 && p.y > (MAP_SIZE_Y - 1) / 2) {
    quad[4]++;
    continue;
  }
}

let res = 1;
for (const q of Object.values(quad)) {
  res *= q;
}

console.log(res);
