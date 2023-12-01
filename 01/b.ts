let res = 0;

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

for await (const line of console) {
  let first: number | undefined = undefined;
  let last: number | undefined = undefined;
  for (let i = 0; i < line.length; i++) {
    const cStart = +line.at(i)!;
    if (first == undefined) {
      if (Number.isInteger(cStart)) {
        first = cStart;
      } else {
        numbers.some((n, index) => {
          const slice = line.slice(i);
          if (slice.startsWith(n)) {
            first = index;
            return true;
          }

          return false;
        });
      }
    }

    const cEnd = +line.at(line.length - i - 1)!;
    if (last == undefined) {
      if (Number.isInteger(cEnd)) {
        last = cEnd;
      } else {
        numbers.some((n, index) => {
          const slice = line.slice(line.length - i - 1);
          if (slice.startsWith(n)) {
            last = index;
            return true;
          }

          return false;
        });
      }
    }
  }

  res += Number((first?.toString() ?? "") + (last?.toString() ?? ""));
}

console.log(res);
