let res = 0;

const grid: string[][] = [];

for await (const line of console) {
  grid.push(line.split(""));
}
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y]!.length; x++) {
    const tile = grid[y]![x]!;
    if (tile === ".") {
      continue;
    }

    const neighbors = [
      grid[y - 1]?.[x - 1] ?? ".",
      grid[y - 1]?.[x] ?? ".",
      grid[y - 1]?.[x + 1] ?? ".",
      grid[y]?.[x - 1] ?? ".",
      grid[y]?.[x + 1] ?? ".",
      grid[y + 1]?.[x - 1] ?? ".",
      grid[y + 1]?.[x] ?? ".",
      grid[y + 1]?.[x + 1] ?? ".",
    ];

    if (neighbors.filter((x) => x === "@").length < 4) {
      res++;
    }
  }
}

console.log(res);
