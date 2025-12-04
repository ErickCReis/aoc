let res = 0;
for await (const line of console) {
  const n = line.split("");

  const selected: { v: number; idx: number }[] = [];
  for (let bat = 11; bat >= 0; bat--) {
    const prevIdx = selected.at(-1)?.idx;
    const start = prevIdx !== undefined ? prevIdx + 1 : 0;
    const slice = n.slice(start, bat === 0 ? undefined : -bat);
    const v = slice.toSorted().toReversed().at(0)!;
    const idx = slice.indexOf(v) + start;

    // console.log({ bat, prevIdx, slice, v, idx });

    selected.push({ v: +v, idx });
  }

  res += +selected.map(({ v }) => v).join("");
}

console.log(res);
