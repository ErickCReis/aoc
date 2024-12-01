let map: string[][] = [];
for await (const line of console) {
  map.push(line.split(""));
}

for (let row = 0; row < map.length; row++) {
  if (!map.at(row)!.includes("#")) {
    map.splice(row, 0, [...map.at(row)!]);
    row++;
  }
}

for (let col = 0; col < map.at(0)!.length; col++) {
  if (map.every((row) => row.at(col) === ".")) {
    map.forEach((row) => row.splice(col, 0, "."));
    col++;
  }
}

const galaxies: { row: number; col: number }[] = [];
for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map.at(row)!.length; col++) {
    if (map[row][col] === "#") {
      galaxies.push({ row, col });
    }
  }
}

const pairs = galaxies.flatMap((v, i) =>
  galaxies.slice(i + 1).map((w) => [v, w])
);

const totalDistance = pairs.reduce((acc, [g1, g2]) => {
  const distance = Math.abs(g1.row - g2.row) + Math.abs(g1.col - g2.col);
  return (acc += distance);
}, 0);

console.log(totalDistance);
