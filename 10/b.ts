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

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const key = `${x}_${y}`;
    if (!visited.has(key)) {
      map[y][x] = ".";
    }
  }
}

for (let y = 0; y < map.length; y++) {
  let inside = false;
  let startingWith = "";
  for (let x = 0; x < map[y].length; x++) {
    let c = mapGet([x, y]);

    // TODO: Encontrar um forma para realizar a subtituição corretamente
    if (c === "S") c = "L";

    if (c === ".") {
      map[y][x] = inside ? "I" : "O";
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
      startingWith = c;
      continue;
    }

    if (c === "7" && startingWith === "L") {
      inside = !inside;
      continue;
    }

    if (c === "J" && startingWith === "F") {
      inside = !inside;
      continue;
    }
  }
}

const res = map.reduce((acc, line) => {
  return (acc += line.reduce((acc, c) => {
    return (acc += c === "I" ? 1 : 0);
  }, 0));
}, 0);

console.log(res);
