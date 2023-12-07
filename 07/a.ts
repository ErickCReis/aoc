const types = [
  "five",
  "four",
  "full",
  "three",
  "twoPair",
  "onePair",
  "high",
] as const;

const cardTypes = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

const hands: {
  cards: typeof cardTypes;
  bid: number;
  type: (typeof types)[number];
}[] = [];
for await (const line of console) {
  const [cards, bid] = line.split(" ");

  let hightestCount = 1;
  const cardMap = new Map<string, number>();
  for (const card of cards) {
    const count = (cardMap.get(card) ?? 0) + 1;
    if (count > hightestCount) {
      hightestCount = count;
    }
    cardMap.set(card, count);
  }

  let type: (typeof types)[number] = "high";
  if (hightestCount === 5) {
    type = "five";
  } else if (hightestCount === 4) {
    type = "four";
  } else if (hightestCount === 3 && cardMap.size === 2) {
    type = "full";
  } else if (hightestCount === 3) {
    type = "three";
  } else if (hightestCount === 2 && cardMap.size === 3) {
    type = "twoPair";
  } else if (hightestCount === 2 && cardMap.size === 4) {
    type = "onePair";
  }
  hands.push({
    cards: cards as unknown as typeof cardTypes,
    bid: +bid,
    type,
  });
}

hands.sort((a, b) => {
  if (a.type === b.type) {
    for (let i = 0; i < 5; i++) {
      if (a.cards[i] === b.cards[i]) {
        continue;
      }

      return cardTypes.indexOf(b.cards[i]) - cardTypes.indexOf(a.cards[i]);
    }
  }

  return types.indexOf(b.type) - types.indexOf(a.type);
});

const res = hands.reduce((acc, hand, index) => {
  return (acc += hand.bid * (index + 1));
}, 0);

console.log(res);
