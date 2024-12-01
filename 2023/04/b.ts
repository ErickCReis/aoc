let res = 0;

const cardMap = new Map<number, number>();
for await (const line of console) {
  const [card, values] = line.split(":");
  const cardNum = Number(card.match(/\d+/));

  const [winningNumbers, numbers] = values.trim().split("|");

  const winSet = new Set(winningNumbers.trim().split(/\s+/));
  const numSet = new Set(numbers.trim().split(/\s+/));
  const intersetcted = [...winSet].filter((w) => numSet.has(w)).length;

  const instances = (cardMap.get(cardNum) ?? 0) + 1;
  cardMap.set(cardNum, instances);

  for (let i = cardNum + 1; i < cardNum + intersetcted + 1; i++) {
    cardMap.set(i, (cardMap.get(i) ?? 0) + instances);
  }
}

for (const [_, instances] of cardMap) {
  res += instances;
}

console.log(res);
