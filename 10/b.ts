let map: string[][] = [];
let start: [number, number] = [0, 0];
for await (const line of console) {
  const x = line.indexOf("S");
  if (x !== -1) {
    start = [x, map.length];
  }

  map.push(line.split(""));
}

function mapGet([x, y]: [number, number]) {
  return map[y]?.[x];
}

const expects = {
  T: { dir: [0, -1], expect: "|7F" }, //top
  R: { dir: [1, 0], expect: "-7J" }, //right
  B: { dir: [0, 1], expect: "|LJ" }, // bottom
  L: { dir: [-1, 0], expect: "-LF" }, // left
} as const;

const expectByPipe = {
  "|": [expects.T, expects.B],
  "-": [expects.R, expects.L],
  "7": [expects.B, expects.L],
  J: [expects.T, expects.L],
  L: [expects.T, expects.R],
  F: [expects.R, expects.B],
  S: [expects.T, expects.R, expects.B, expects.L],
};

const [sx, sy] = start;
let curr: [number, number] = start;
const visited = new Set<string>([`${sx}_${sy}`]);
let started = false;
do {
  for (const { dir, expect } of expectByPipe[
    mapGet(curr) as keyof typeof expectByPipe
  ]) {
    const check: [number, number] = [curr[0] + dir[0], curr[1] + dir[1]];
    const key = `${check[0]}_${check[1]}`;

    if (!visited.has(key) && expect.includes(mapGet(check))) {
      curr = check;
      visited.add(key);
      break;
    }

    if (mapGet(check) === "S") {
      if (!started) {
        started = true;
      } else {
        curr = check;
        visited.add(key);
      }
    }
  }
} while (curr[0] !== sx || curr[1] !== sy);

for (const [p, dirs] of Object.entries(expectByPipe)) {
  if (p === "S") continue;

  const point1: [number, number] = [sx + dirs[0].dir[0], sy + dirs[0].dir[1]];
  const point2: [number, number] = [sx + dirs[1].dir[0], sy + dirs[1].dir[1]];

  if (
    dirs[0].expect.includes(mapGet(point1)) &&
    dirs[1].expect.includes(mapGet(point2))
  ) {
    map[sy][sx] = p;
    break;
  }
}

let res = 0;
for (let y = 0; y < map.length; y++) {
  let inside = false;
  let lastCorner = "";
  for (let x = 0; x < map[y].length; x++) {
    if (!visited.has(`${x}_${y}`)) {
      map[y][x] = ".";
    }

    const c = mapGet([x, y]);
    if (c === ".") {
      res += inside ? 1 : 0;
      continue;
    }

    if (c === "-") {
      continue;
    }

    if (c === "|") {
      inside = !inside;
      continue;
    }

    if (c === "F" || c === "L") {
      lastCorner = c;
      continue;
    }

    if (c === "7" && lastCorner === "L") {
      inside = !inside;
      continue;
    }

    if (c === "J" && lastCorner === "F") {
      inside = !inside;
      continue;
    }
  }
}

console.log(res);
