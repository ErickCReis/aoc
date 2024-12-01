import { inputStream } from "../utils.ts";

const left = [];
const right = [];
for await (const line of inputStream) {
  const [a, b] = line.split("   ");
  left.push(+a);
  right.push(+b);
}

left.sort();
right.sort();

let res = 0;
for (let i = 0; i < left.length; i++) {
  res += Math.abs(left[i] - right[i]);
}

console.log(res);
