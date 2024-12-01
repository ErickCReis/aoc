const boxes = new Map<number, { label: string; fl: number }[]>();
for await (const line of console) {
  for (const step of line.split(",")) {
    const [_, label, op, fl] = step.match(/(\w+)([-=])(\d*)/) ?? [];
    const boxNumber = hash(label);
    const lens = boxes.get(boxNumber);

    if (op === "-") {
      if (!lens) continue;

      const newSet = lens.filter((l) => l.label != label);
      boxes.set(boxNumber, newSet);

      continue;
    }

    if (op === "=") {
      const newSet = lens ?? [];

      let updated = false;
      newSet.forEach((l) => {
        if (l.label === label) {
          l.fl = +fl;
          updated = true;
        }
      });

      if (!updated) {
        newSet.push({ label, fl: +fl });
      }

      boxes.set(boxNumber, newSet);
    }
  }
}

let res = 0;
for (let boxNumber = 0; boxNumber < 256; boxNumber++) {
  const lens = boxes.get(boxNumber);
  if (!lens) continue;

  for (let lensIndex = 0; lensIndex < lens.length; lensIndex++) {
    const { fl } = lens[lensIndex];
    res += (boxNumber + 1) * (lensIndex + 1) * fl;
  }
}

console.log(res);

function hash(s: string) {
  return s
    .split("")
    .map((s) => s.charCodeAt(0))
    .reduce((a, v) => ((a + v) * 17) % 256, 0);
}
