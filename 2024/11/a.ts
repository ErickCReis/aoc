import { inputStream } from "../utils.ts";

let stones: number[] = [];
for await (const line of inputStream) {
  stones = line.split(" ").map(Number);
}

for (let i = 0; i < 25; i++) {
  const newStones: number[] = [];
  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    const stoneStr = stone.toString();
    if (stoneStr.length % 2 === 0) {
      newStones.push(+stoneStr.substring(0, stoneStr.length / 2));
      newStones.push(+stoneStr.substring(stoneStr.length / 2));
      continue;
    }

    newStones.push(stone * 2024);
  }

  stones = newStones;
}

console.log(stones.length);
