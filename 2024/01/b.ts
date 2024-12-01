const data = await Deno.readTextFile("input.txt");

const left = [];
const rightFreq: Record<string, number> = {};
for await (const line of data.split("\n")) {
  const [a, b] = line.split("   ");
  left.push(+a);
  rightFreq[+b] = (rightFreq[+b] ?? 0) + 1;
}

let res = 0;
for (const a of left) {
  res += a * (rightFreq[a] ?? 0);
}
console.log(res);
