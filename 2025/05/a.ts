let res = 0;

let ranges: [number, number][] = [];
let readingRanges = true;
for await (const line of console) {
  if (!line) {
    readingRanges = false;
    continue;
  }

  if (readingRanges) {
    const [s, e] = line.split("-");
    ranges.push([+s!, +e!]);
    continue;
  }

  for (const [s, e] of ranges) {
    if (+line >= s && +line <= e) {
      res++;
      break;
    }
  }
}

console.log(res);
