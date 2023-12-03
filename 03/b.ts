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
  const maybeGears = window[1].matchAll(/\*{1}/g);
  for (const match of maybeGears) {
    const position = match.index;
    if (position == undefined) continue;

    const partNumbers = dirs.reduce((acc, [x, dy]) => {
      const c = window[x][position + dy];

      if (c >= "0" && c <= "9") {
        let tempNum = c;
        let pivot = position + dy;
        while (window[x][++pivot] >= "0" && window[x][pivot] <= "9") {
          tempNum += window[x][pivot];
        }

        pivot = position + dy;
        while (window[x][--pivot] >= "0" && window[x][pivot] <= "9") {
          tempNum = window[x][pivot] + tempNum;
        }

        acc.add(`${x}${pivot}.${tempNum}`);
      }

      return acc;
    }, new Set<string>());

    if (partNumbers.size === 2) {
      res += [...partNumbers].reduce((acc, hash) => {
        const value = +hash.split(".")[1];
        return (acc *= value);
      }, 1);
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
