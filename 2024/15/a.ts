import { inputStream } from "../utils.ts";

const MOVE = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as const;

type Move = keyof typeof MOVE;

const map: string[][] = [];
const robot: [number, number] = [-1, -1];
const moves: Move[] = [];

let isMap = true;
for await (const line of inputStream) {
  if (!line) {
    isMap = false;
  }

  if (isMap) {
    const row = line.split("");
    const robotIndex = row.indexOf("@");
    if (robotIndex !== -1) {
      robot[0] = map.length;
      robot[1] = robotIndex;
      row[robotIndex] = ".";
    }
    map.push(row);
  } else {
    moves.push(...(line.split("") as Move[]));
  }
}

function makeMove(move: Move) {
  const [dy, dx] = MOVE[move];
  const next = map[robot[0] + dy][robot[1] + dx];

  if (next === "#") {
    return;
  }

  if (next === ".") {
    robot[0] += dy;
    robot[1] += dx;
    return;
  }

  if (next === "O") {
    let i = 2;
    do {
      const nextNext = map[robot[0] + dy * i]?.[robot[1] + dx * i];
      if (!nextNext || nextNext === "#") {
        i = -1;
        break;
      }

      if (nextNext === ".") {
        break;
      }

      i++;
    } while (true);

    if (i === -1) {
      return;
    }

    map[robot[0] + dy * i][robot[1] + dx * i] = "O";

    robot[0] += dy;
    robot[1] += dx;

    map[robot[0]][robot[1]] = ".";
  }
}

for (const move of moves) {
  makeMove(move);
}

let res = 0;
for (let y = 0; y < map.length; y++) {
  const row = map[y];
  for (let x = 0; x < row.length; x++) {
    const box = row[x];
    if (box === "O") {
      res += 100 * y + x;
    }
  }
}
console.log(res);
