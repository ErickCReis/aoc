let res = 0;
for await (const line of console) {
  const [r, g] = line.split(" ");
  const row = r.split("");
  const groups = g.split(",").map(Number);

  const variations: string[][] = [];
  generate(row, variations);

  const regexParts: RegExp[] = [];
  for (let i = 0; i < groups.length; i++) {
    regexParts.push(i === 0 ? /^\.*/ : /\.+/);
    regexParts.push(new RegExp(`#{${groups.at(i)}}`));
  }
  regexParts.push(/\.*$/);

  const regex = new RegExp(regexParts.map((r) => r.source).join(""));
  for (const v of variations) {
    if (v.join("").match(regex)) {
      res++;
    }
  }
}

function generate(row: string[], result: string[][]) {
  const index = row.findIndex((r) => r === "?");

  if (index == -1) {
    result.push(row);
    return;
  }

  const operational = [...row];
  operational[index] = ".";
  generate(operational, result);

  const damage = [...row];
  damage[index] = "#";
  generate(damage, result);
}

console.log(res);
