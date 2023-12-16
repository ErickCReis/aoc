const layout: string[] = [];
for await (const line of console) {
  layout.push(line);
}

type Dir = "<" | ">" | "^" | "v";
type Tile = "." | "/" | "\\" | "|" | "-";

type Beam = {
  x: number;
  y: number;
  dir: Dir;
};

const deltaMap: Record<Tile, Record<Dir, [Beam] | [Beam, Beam]>> = {
  ".": {
    "<": [
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
    ">": [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
    ],
    "^": [
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    v: [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
    ],
  },
  "/": {
    "<": [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
    ],
    ">": [
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    "^": [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
    ],
    v: [
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
  },
  "\\": {
    "<": [
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    ">": [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
    ],
    "^": [
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
    v: [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
    ],
  },
  "-": {
    "<": [
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
    ">": [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
    ],
    "^": [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
    v: [
      {
        x: 1,
        y: 0,
        dir: ">",
      },
      {
        x: -1,
        y: 0,
        dir: "<",
      },
    ],
  },
  "|": {
    "<": [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    ">": [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    "^": [
      {
        x: 0,
        y: -1,
        dir: "^",
      },
    ],
    v: [
      {
        x: 0,
        y: 1,
        dir: "v",
      },
    ],
  },
};

const visited = new Set<string>();
const visitedKey = ({ x, y, dir }: Beam) => `${x}_${y}_${dir}`;
const powered = new Set<string>();
const poweredKey = ({ x, y }: Beam) => `${x}_${y}`;

function clear() {
  visited.clear();
  powered.clear();
}

let max = 0;

for (let y = 0; y < layout.length; y++) {
  move({ x: 0, y, dir: ">" });
  max = Math.max(max, powered.size);
  clear();
  move({ x: layout[0].length, y, dir: "<" });
  max = Math.max(max, powered.size);
  clear();
}

for (let x = 0; x < layout[0].length; x++) {
  move({ x, y: 0, dir: "v" });
  max = Math.max(max, powered.size);
  clear();
  move({ x, y: layout.length, dir: "^" });
  max = Math.max(max, powered.size);
  clear();
}

console.log(max);

function move(b: Beam) {
  const vk = visitedKey(b);

  if (visited.has(vk)) return;

  visited.add(vk);

  const tile = layout[b.y]?.charAt(b.x) as Tile | undefined;
  if (!tile) return;

  powered.add(poweredKey(b));

  const [next1, next2] = deltaMap[tile][b.dir];

  move({ x: b.x + next1.x, y: b.y + next1.y, dir: next1.dir });
  if (next2) {
    move({ x: b.x + next2.x, y: b.y + next2.y, dir: next2.dir });
  }
}
