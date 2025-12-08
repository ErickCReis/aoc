let res = 0;

const map: string[][] = [];
for await (const line of console) {
  const row = line.split("");
  const rowIdx = map.length;

  if (rowIdx === 0) {
    map.push(row);
    continue;
  }

  for (let i = 0; i < row.length; i++) {
    const curr = row[i];
    const top = map[rowIdx - 1]![i];
    if (curr === "." && top === "S") {
      row[i] = "|";
      continue;
    }

    if (curr === "." && top === "|") {
      row[i] = "|";
      continue;
    }

    if (curr === "^" && top === "|") {
      if (row[i - 1]) row[i - 1] = "|";
      if (row[i + 1]) row[i + 1] = "|";
      res++;
      continue;
    }
  }

  map.push(row);
}

// console.log(map.map((r) => r.join("")).join("\n"));
console.log(res);
