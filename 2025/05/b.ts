let res = 0;
const ranges: [number, number][] = [];
for await (const line of console) {
  if (!line) {
    break;
  }

  const [s, e] = line.split("-");
  ranges.push([+s!, +e!]);
}

let changed = true;
while (changed) {
  ranges.sort(([sa], [sb]) => sa - sb);
  changed = false;
  for (let i = 0; i <= ranges.length - 1; ) {
    const r1 = ranges[i];
    const r2 = ranges[i + 1];
    if (!r1 || !r2) {
      break;
    }

    if (r1[0] <= r2[0] && r1[1] >= r2[1]) {
      ranges.splice(i + 1, 1);
      changed = true;
      continue;
    }

    if (r1[1] >= r2[0]) {
      r1[1] = r2[1];
      ranges.splice(i + 1, 1);
      changed = true;
      continue;
    }

    i++;
  }
}

for (const r of ranges) {
  res += r[1] - r[0] + 1;
}

console.log(res);
