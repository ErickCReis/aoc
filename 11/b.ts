let map: string[][] = [];
for await (const line of console) {
  map.push(line.split(""));
}

let rowsOfStars: number[] = [];
for (let row = 0; row < map.length; row++) {
  if (!map.at(row)!.includes("#")) {
    map.splice(row, 1, Array(map.at(row)!.length).fill("*"));
    rowsOfStars.push(row);
    row++;
  }
}

let colsOfStars: number[] = [];
for (let col = 0; col < map.at(0)!.length; col++) {
  if (map.every((row) => row.at(col) === "." || row.at(col) === "*")) {
    map.forEach((row) => row.splice(col, 1, "*"));
    colsOfStars.push(col);
    col++;
  }
}

const galaxies: { row: number; col: number }[] = [];

let starRowsAbove = 0;
for (let row = 0; row < map.length; row++) {
  if (rowsOfStars.includes(row)) {
    starRowsAbove++;
    continue;
  }

  let starColsOnLeft = 0;
  for (let col = 0; col < map.at(row)!.length; col++) {
    if (colsOfStars.includes(col)) {
      starColsOnLeft++;
      continue;
    }

    if (map[row][col] === "#") {
      galaxies.push({
        row: row + starRowsAbove * (1_000_000 - 1),
        col: col + starColsOnLeft * (1_000_000 - 1),
      });
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
