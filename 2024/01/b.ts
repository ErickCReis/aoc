import { inputStream } from "../utils.ts";

const left = [];
const rightFreq: Record<string, number> = {};

for await (const line of inputStream) {
  const [a, b] = line.split("   ");
  left.push(+a);
  rightFreq[+b] = (rightFreq[+b] ?? 0) + 1;
}

let res = 0;
for (const a of left) {
  res += a * (rightFreq[a] ?? 0);
}

console.log(res);
