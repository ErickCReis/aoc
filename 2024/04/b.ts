import { inputStream } from "../utils.ts";

const grid: string[] = [];
for await (const line of inputStream) {
  grid.push(line);
}

const ySize = grid.length;
const xSize = grid[0].length;

const validCorners = ["MSMS", "SMSM", "MMSS", "SSMM"];

function check([y, x]: [number, number]) {
  if (y < 0 || y > ySize || x < 0 || x > xSize) {
    return false;
  }

  if (grid[y][x] !== "A") {
    return false;
  }

  const corners =
    grid[y - 1]?.[x - 1] +
    grid[y - 1]?.[x + 1] +
    grid[y + 1]?.[x - 1] +
    grid[y + 1]?.[x + 1];

  return validCorners.includes(corners);
}

let res = 0;

for (let y = 0; y < ySize; y++) {
  for (let x = 0; x < xSize; x++) {
    res += check([y, x]) ? 1 : 0;
  }
}

console.log(res);
