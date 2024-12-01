let map: string[] = [];
let start: [number, number] = [0, 0];
for await (const line of console) {
  const x = line.indexOf("S");
  if (x !== -1) {
    start = [x, map.length];
  }

  map.push(line);
}

function mapGet([x, y]: [number, number]) {
  return map[y]?.[x];
}

const expects = [
  { dir: [0, -1], expect: "|7F" }, //top
  { dir: [1, 0], expect: "-7J" }, //right
  { dir: [0, 1], expect: "|LJ" }, // bottom
  { dir: [-1, 0], expect: "-LF" }, // left
] as const;

const expectByPipe = {
  "|": [expects[0], expects[2]],
  "-": [expects[1], expects[3]],
  "7": [expects[2], expects[3]],
  J: [expects[0], expects[3]],
  L: [expects[0], expects[1]],
  F: [expects[1], expects[2]],
  S: expects,
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

console.log(visited.size / 2);
