let res = 0;

let pattern: string[][] = [];
let refletions: number[] = [];
for await (const line of console) {
  if (line === "") {
    res += fixSmudge();

    pattern = [];
    refletions = [];
    continue;
  }

  pattern.push(line.split(""));
}

res += fixSmudge();
console.log(res);

function fixSmudge(): number {
  const firstResult = find();

  let mirrorIndex = 0;
  toggleSmudge(mirrorIndex);
  let founded = find(firstResult);

  while (founded === firstResult || founded === 0) {
    toggleSmudge(mirrorIndex++);

    if (mirrorIndex >= pattern.length * pattern[0].length) break;

    toggleSmudge(mirrorIndex);
    founded = find(firstResult);
  }

  return founded;
}

function toggleSmudge(mirrorIndex: number) {
  const line = Math.floor(mirrorIndex / pattern[0].length);
  const index = mirrorIndex % pattern[0].length;

  const current = pattern?.[line]?.[index];

  if (!current) return;

  if (current === ".") {
    pattern[line][index] = "#";
  } else {
    pattern[line][index] = ".";
  }
}

function find(ignoreResult?: number): number {
  let refletionResult = checkPattern(pattern).find((r) => r !== ignoreResult);
  if (refletionResult != undefined) {
    return refletionResult;
  }

  const newPattern = pattern[0].map((_, colIndex) =>
    pattern.map((row) => row[colIndex])
  );

  refletionResult =
    checkPattern(newPattern)
      .map((r) => r * 100)
      .find((r) => r !== ignoreResult) ?? 0;

  return refletionResult;
}

function checkPattern(pattern: string[][]) {
  for (let i = 0; i < pattern.length; i++) {
    const line = pattern[i];
    const found = findVerticalReflection(line.join(""), 1);

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

  return refletions;
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
