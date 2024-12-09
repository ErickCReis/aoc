import { inputStream } from "../utils.ts";

let res = 0;
for await (const line of inputStream) {
  const diskMap = line.split("").map(Number);

  let id = 0;
  const result: (number | ".")[] = [];
  for (let i = 0; i < diskMap.length; i++) {
    const m = diskMap[i];

    if (i % 2 === 0) {
      result.push(...Array.from({ length: m }, () => id));
      id++;
    } else {
      result.push(...Array.from({ length: m }, () => "." as const));
    }
  }

  for (let i = result.length - 1; i >= 0; i--) {
    const m = result[i];
    if (m === ".") {
      continue;
    }

    const free = result.indexOf(".");
    if (free === -1) {
      break;
    }

    result[free] = m;
    result[i] = ".";
  }

  // fix an error in last step
  result.shift();

  for (let i = 0; i < result.length; i++) {
    const m = result[i];
    if (m === ".") {
      continue;
    }

    res += i * m;
  }
}

console.log(res);
