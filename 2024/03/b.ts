import { inputStream } from "../utils.ts";

let res = 0;
let enable = true;

for await (const line of inputStream) {
  for (const match of line.matchAll(
    /(mul)\((\d+),(\d+)\)|(don\'t)\(\)|(do)\(\)/g
  )) {
    const [, , first, second, dont, doo] = match;

    if (dont) {
      enable = false;
      continue;
    }

    if (doo) {
      enable = true;
      continue;
    }

    if (enable) {
      res += +first * +second;
    }
  }
}

console.log(res);
