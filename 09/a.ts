let res = 0;
let map: number[][] = [];
for await (const line of console) {
  map = [];

  let sequence = line.split(" ").map(Number);
  map.unshift(sequence);

  while (sequence.some((n) => n !== 0)) {
    sequence = sequence.reduce((acc, _, i, seq) => {
      if (seq[i + 1] === undefined) {
        return acc;
      }

      acc.push(seq[i + 1] - seq[i]);

      return acc;
    }, [] as number[]);

    map.unshift(sequence);
  }

  for (let i = 0; i < map.length; i++) {
    if (i === 0) {
      map[i].push(0);
      continue;
    }

    map[i].push(map[i - 1]!.at(-1)! + map[i]!.at(-1)!);
  }

  res += map.at(-1)!.at(-1)!;
}

console.log(res);
