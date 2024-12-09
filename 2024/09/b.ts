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

  for (let i = id - 1; i >= 0; i--) {
    const size = result.filter((r) => r === i).length;
    const startIndex = result.indexOf(i);

    let seqIndex = -1;
    let count = 0;
    for (let j = 0; j < startIndex; j++) {
      if (result[j] === ".") {
        count++;

        if (count === size) {
          seqIndex = j - count + 1;
          break;
        }
      } else {
        count = 0;
      }
    }

    if (seqIndex === -1) {
      continue;
    }

    result.splice(seqIndex, size, ...Array.from({ length: size }, () => i));

    result.splice(
      startIndex,
      size,
      ...Array.from({ length: size }, () => "." as const)
    );
  }

  for (let i = 0; i < result.length; i++) {
    const m = result[i];
    if (m === ".") {
      continue;
    }

    res += i * m;
  }
}

console.log(res);
