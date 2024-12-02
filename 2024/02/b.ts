import { inputStream } from "../utils.ts";

function isSafe(levels: number[]) {
  const diff = [];
  for (let i = 1; i < levels.length; i++) {
    diff.push(levels[i] - levels[i - 1]);
  }

  return (
    diff.every((d) => d >= 1 && d <= 3) || diff.every((d) => d >= -3 && d <= -1)
  );
}

let res = 0;
for await (const line of inputStream) {
  const levels = line.split(" ").map(Number);

  let safe = isSafe(levels);
  for (let i = 0; i < levels.length && !safe; i++) {
    const newLevels = levels.toSpliced(i, 1);
    safe = isSafe(newLevels);
  }

  if (safe) res++;
}

console.log(res);
