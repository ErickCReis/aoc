import { inputStream } from "../utils.ts";

const grid: string[] = [];
for await (const line of inputStream) {
  grid.push(line);
}

const XMAS = "XMAS";

const ySize = grid.length;
const xSize = grid[0].length;

function check(dir: "l" | "b" | "bl" | "br", [y, x]: [number, number]) {
  if (y < 0 || y > ySize || x < 0 || x > xSize) {
    return false;
  }

  let word: string[] = [];

  if (dir === "l") {
    word = [grid[y][x], grid[y][x + 1], grid[y][x + 2], grid[y][x + 3]];
  }

  if (dir === "b") {
    word = [grid[y][x], grid[y + 1]?.[x], grid[y + 2]?.[x], grid[y + 3]?.[x]];
  }

  if (dir === "bl") {
    word = [
      grid[y][x],
      grid[y + 1]?.[x + 1],
      grid[y + 2]?.[x + 2],
      grid[y + 3]?.[x + 3],
    ];
  }

  if (dir === "br") {
    word = [
      grid[y][x],
      grid[y + 1]?.[x - 1],
      grid[y + 2]?.[x - 2],
      grid[y + 3]?.[x - 3],
    ];
  }

  return word.join("") === XMAS || word.reverse().join("") === XMAS;
}

let res = 0;

for (let y = 0; y < ySize; y++) {
  for (let x = 0; x < xSize; x++) {
    res += check("l", [y, x]) ? 1 : 0;
    res += check("b", [y, x]) ? 1 : 0;
    res += check("bl", [y, x]) ? 1 : 0;
    res += check("br", [y, x]) ? 1 : 0;
  }
}

console.log(res);
