import { inputStream } from "../utils.ts";

let res = 0;
for await (const line of inputStream) {
  const levels = line.split(" ").map(Number);

  const diff = [];
  for (let i = 1; i < levels.length; i++) {
    diff.push(levels[i] - levels[i - 1]);
  }

  const safe =
    diff.every((d) => d >= 1 && d <= 3) ||
    diff.every((d) => d >= -3 && d <= -1);

  if (safe) res++;
}

console.log(res);
