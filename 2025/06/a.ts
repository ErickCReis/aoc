let res = 0;

const input: number[][] = [];
for await (const line of console) {
  const itens = line
    .split(" ")
    .map((v) => +v.trim())
    .filter(Boolean);

  if (isNaN(itens[0]!)) {
    const operations = line
      .split(" ")
      .map((v) => v.trim())
      .filter(Boolean);

    for (let i = 0; i < operations.length; i++) {
      let rowRes = operations[i] === "*" ? 1 : 0;
      for (const row of input) {
        if (operations[i] === "*") {
          rowRes *= row[i]!;
        }

        if (operations[i] === "+") {
          rowRes += row[i]!;
        }
      }
      res += rowRes;
    }

    break;
  }

  input.push(itens);
}

console.log(res);
