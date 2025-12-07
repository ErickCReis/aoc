let res = 0;

const map: string[] = [];
for await (const line of console) {
  map.push(line);
}

const rowSize = map[0]!.length;
let col: string[] = [];
for (let i = rowSize - 1; i >= -1; i--) {
  let newNumber = "";
  for (const row of map) {
    newNumber += row[i] ?? "";
  }

  if (newNumber.trim() === "") {
    const op = col.at(-1)?.at(-1);

    if (op === "+") {
      res += col.reduce((acc, v) => acc + +v.match(/\d+/)!, 0);
    }

    if (op === "*") {
      res += col.reduce((acc, v) => acc * +v.match(/\d+/)!, 1);
    }

    col = [];
    // console.log(res);
  } else {
    col.push(newNumber);
  }

  // console.log(newNumber, col);
}

console.log(res);
