import { inputStream } from "../utils.ts";

let stones: number[] = [];
for await (const line of inputStream) {
  stones = line.split(" ").map(Number);
}

const cache = new Map<string, number>();
function blink(stone: number, depth: number): number {
  const key = `${stone}_${depth}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  if (depth >= 75) {
    return 0;
  }

  if (stone === 0) {
    const r = blink(1, depth + 1);
    cache.set(key, r);
    return r;
  }

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const r1 = blink(+stoneStr.substring(0, stoneStr.length / 2), depth + 1);
    const r2 = blink(+stoneStr.substring(stoneStr.length / 2), depth + 1);

    const r = r1 + r2 + 1;
    cache.set(key, r);
    return r;
  }

  const r = blink(stone * 2024, depth + 1);
  cache.set(key, r);
  return r;
}

let res = stones.length;
for (const stone of stones) {
  res += blink(stone, 0);
}

console.log(res);
