const types = [
  "five",
  "four",
  "full",
  "three",
  "twoPair",
  "onePair",
  "high",
] as const;
type Type = (typeof types)[number];

const cardTypes = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;
type CardType = (typeof cardTypes)[number];

const hands: {
  cards: CardType[];
  bid: number;
  type: (typeof types)[number];
}[] = [];
for await (const line of console) {
  const hand = line.split(" ");
  const cards = hand[0] as unknown as CardType[];
  const bid = +hand[1];

  const cardMap = new Map<CardType, number>();
  for (const card of cards) {
    const count = (cardMap.get(card) ?? 0) + 1;
    cardMap.set(card, count);
  }

  const jokers = cardMap.get("J") ?? 0;
  cardMap.delete("J");
  const sortedScores = [...cardMap.values()].sort((a, b) => b - a);
  sortedScores[0] += jokers;
  const [first, second] = sortedScores;

  let type: Type = "high";
  if (first === 5 || jokers === 5) {
    type = "five";
  } else if (first === 4) {
    type = "four";
  } else if (first === 3 && second === 2) {
    type = "full";
  } else if (first === 3) {
    type = "three";
  } else if (first === 2 && second === 2) {
    type = "twoPair";
  } else if (first === 2) {
    type = "onePair";
  }
  hands.unshift({
    cards,
    bid,
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
