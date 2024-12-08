import { inputStream } from "../utils.ts";

const size = [0, 0];
const map: Record<
  string,
  { antennas: (readonly [number, number])[]; antiNodes: Set<string> }
> = {};

for await (const line of inputStream) {
  const row = line.split("");
  for (let x = 0; x < row.length; x++) {
    const type = row[x];
    if (type === ".") {
      continue;
    }

    const pos = [size[0], x] as const;
    if (!map[type]) {
      map[type] = { antennas: [pos], antiNodes: new Set() };
    } else {
      map[type].antennas.push(pos);
    }
  }

  size[0]++;
  size[1] = line.length;
}

for (const { antennas, antiNodes } of Object.values(map)) {
  for (let i = 0; i < antennas.length; i++) {
    const a = antennas[i];

    for (let j = i; j < antennas.length; j++) {
      const b = antennas[j];

      const diff = [b[0] - a[0], b[1] - a[1]] as const;

      const node1 = [a[0] - diff[0], a[1] - diff[1]] as const;
      if (
        node1[0] >= 0 &&
        node1[0] < size[0] &&
        node1[1] >= 0 &&
        node1[1] < size[1]
      ) {
        antiNodes.add(`${node1[0]}_${node1[1]}`);
      }

      const node2 = [b[0] + diff[0], b[1] + diff[1]] as const;
      if (
        node2[0] >= 0 &&
        node2[0] < size[0] &&
        node2[1] >= 0 &&
        node2[1] < size[1]
      ) {
        antiNodes.add(`${node2[0]}_${node2[1]}`);
      }
    }
  }

  for (const antenna of antennas) {
    antiNodes.delete(`${antenna[0]}_${antenna[1]}`);
  }
}

let result = new Set<string>();
for (const { antiNodes } of Object.values(map)) {
  result = result.union(antiNodes);
}

console.log(result.size);
