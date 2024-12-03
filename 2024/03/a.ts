import { inputStream } from "../utils.ts";

let res = 0;
for await (const line of inputStream) {
  for (const match of line.matchAll(/mul\((\d+),(\d+)\)/g)) {
    const [, first, second] = match;

    res += +first * +second;
  }
}

console.log(res);
