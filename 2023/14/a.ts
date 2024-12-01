type P = {
  x: number;
  y: number;
};

let platform: string[][] = [];
for await (const line of console) {
  platform.push(line.split(""));
}

for (let i = 0; i < platform.length; i++) {
  move(i);
}

const res = platform.toReversed().reduce((a, line, i) => {
  const rocks = line.filter((r) => r === "O").length;

  return (a += rocks * (i + 1));
}, 0);

console.log(res);

function move(lineIndex: number) {
  for (let x = 0; x < platform[lineIndex].length; x++) {
    if (platform[lineIndex][x] !== "O") continue;

    let newYPosition = lineIndex;
    for (let y = lineIndex - 1; y >= 0; y--) {
      if (platform[y]?.[x] !== ".") break;
      newYPosition = y;
    }

    if (newYPosition == lineIndex) continue;
    swap({ x, y: lineIndex }, { x, y: newYPosition });
  }
}

function swap(position: P, newPosition: P) {
  const temp = platform[position.y][position.x];
  platform[position.y][position.x] = platform[newPosition.y][newPosition.x];
  platform[newPosition.y][newPosition.x] = temp;
}
