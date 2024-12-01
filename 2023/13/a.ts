let res = 0;

let pattern: string[] = [];
let refletions: number[] = [];
for await (const line of console) {
  if (line === "") {
    res += find();

    pattern = [];
    refletions = [];
    continue;
  }

  pattern.push(line);
}

res += find();
console.log(res);

function find(): number {
  const refletionIndex = checkPattern();

  if (refletionIndex > 0) {
    return refletionIndex;
  }

  pattern = pattern[0]
    .split("")
    .map((_, colIndex) => pattern.map((row) => row[colIndex]).join(""));

  return checkPattern() * 100;
}

function checkPattern() {
  for (let i = 0; i < pattern.length; i++) {
    const line = pattern[i];
    const found = findVerticalReflection(line, 1);

    if (i === 0) {
      refletions = found;
    } else {
      refletions = found.reduce((a, c) => {
        if (refletions.includes(c)) {
          a.push(c);
        }

        return a;
      }, [] as number[]);
    }
  }

  if (refletions.length >= 1) {
    return refletions[0];
  }

  return 0;
}

function findVerticalReflection(line: string, lineIndex: number): number[] {
  if (lineIndex >= line.length) return [];

  const left = line
    .substring(line.length - (line.length - lineIndex) * 2, lineIndex)
    .split("")
    .reverse()
    .join("");
  const right = line.substring(lineIndex, lineIndex * 2);

  const next = findVerticalReflection(line, lineIndex + 1);

  if (left === right) {
    next.unshift(lineIndex);
  }

  return next;
}
