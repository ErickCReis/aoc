type P = {
  x: number;
  y: number;
};

let platform: string[][] = [];
for await (const line of console) {
  platform.push(line.split(""));
}

const cache = new Map<string, { cycle: number[]; platform: string[][] }>();
const hash = () => platform.map((p) => p.join("")).join("");

for (let c = 0; c < 1_000_000_000; ) {
  const startHash = hash();

  if (cache.has(startHash)) {
    const ca = cache.get(startHash)!;

    const maxC =
      ca.cycle.find((cycle) => c + cycle < 1_000_000_000) ??
      Number.MAX_SAFE_INTEGER;

    if (maxC < 1_000_000_000) {
      platform = ca.platform;
      c += maxC;

      cache.set(startHash, { cycle: [c, ...ca.cycle], platform });

      continue;
    }
  }

  cycle();

  cache.set(startHash, { cycle: [c], platform });

  c++;
}

const res = platform.toReversed().reduce((a, line, i) => {
  const rocks = line.filter((r) => r === "O").length;

  return (a += rocks * (i + 1));
}, 0);

console.log(res);

function cycle() {
  for (let t = 0; t < 4; t++) {
    for (let i = 0; i < platform.length; i++) {
      move(i);
    }

    platform = platform[0].map((_, colIndex) =>
      platform.map((row) => row[colIndex]).toReversed()
    );
  }
}

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
