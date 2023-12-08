let instructions: string = "";
const map = new Map<string, [string, string]>();
for await (const line of console) {
  if (instructions === "") {
    instructions = line;
    continue;
  }

  const match = line.match(/[A-Z]{3}/g);
  if (!match) continue;

  const [key, l, r] = match;
  map.set(key, [l, r]);
}

let key = "AAA";
let steps = 0;

while (key !== "ZZZ") {
  for (const c of instructions) {
    const dir = map.get(key);
    if (!dir) continue;
    key = c === "L" ? dir[0] : dir[1];
    steps++;

    if (key === "ZZZ") break;
  }
}

console.log(steps);
