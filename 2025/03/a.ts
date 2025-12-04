let res = 0;
for await (const line of console) {
  const n = line.split("");

  const l1 = n.slice(0, -1).toSorted().toReversed().at(0)!;
  const l1Idx = n.indexOf(l1);

  const l2 = n
    .slice(l1Idx + 1)
    .toSorted()
    .toReversed()
    .at(0)!;

  res += +l1 * 10 + +l2;
}

console.log(res);
