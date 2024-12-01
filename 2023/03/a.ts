let res = 0;

const dirs = [
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  // [1, 0],
  [1, 1],
  [2, -1],
  [2, 0],
  [2, 1],
] as const;
const window: [prev: string, curr: string, next: string] = ["", "", ""];

function moveWindow(line: string) {
  window[0] = window[1];
  window[1] = window[2];
  window[2] = line;
}

function checkLine() {
  const numbers = window[1].matchAll(/\d+/g);
  for (const match of numbers) {
    const num = match[0];
    const position = match.index;

    if (position == undefined) continue;

    let hasAdjacentSymbol = false;
    for (
      let i = position;
      i < num.length + position && !hasAdjacentSymbol;
      i++
    ) {
      hasAdjacentSymbol = dirs.some(([x, dy]) => {
        const c = window[x][i + dy];
        return !!c && c != "." && (c < "0" || c > "9");
      });
    }

    if (hasAdjacentSymbol) {
      res += +num;
    }
  }
}

for await (const line of console) {
  if (window[2] == "") {
    window[2] = line;
    continue;
  }

  moveWindow(line);
  checkLine();
}

moveWindow("");
checkLine();

console.log(res);
