let instructions: string = "";
const map = new Map<string, [string, string]>();
const keys: string[] = [];

for await (const line of console) {
  if (instructions === "") {
    instructions = line;
    continue;
  }

  const match = line.match(/[A-Z0-9]{3}/g);
  if (!match) continue;

  const [key, l, r] = match;
  map.set(key, [l, r]);

  if (key[2] === "A") keys.push(key);
}

let steps = Array.from(keys).map((_) => 0);
for (let i = 0; i < keys.length; i++) {
  while (keys[i][2] != "Z") {
    for (const c of instructions) {
      const dir = map.get(keys[i])!;
      const newKey = c === "L" ? dir[0] : dir[1];
      keys[i] = newKey;
      steps[i]++;
      if (newKey[2] === "Z") break;
    }
  }
}

function mmc(n: number[]): number {
  if (n.length === 0) return 0;
  if (n.length === 1) return n[0];

  const n1 = n[0];
  const n2 = n.length == 2 ? n[1] : mmc(n.slice(1));

  let [resto, x, y] = [-1, n1, n2];
  while (resto != 0) {
    resto = x % y;
    x = y;
    y = resto;
  }
  return (n1 * n2) / x;
}

console.log(mmc(steps));
