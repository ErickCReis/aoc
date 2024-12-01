let res = 0;

for await (const line of console) {
  const [_, values] = line.split(":");
  const [winningNumbers, numbers] = values.trim().split("|");

  const winSet = new Set(winningNumbers.trim().split(/\s+/));
  const numSet = new Set(numbers.trim().split(/\s+/));
  const intersetcted = [...winSet].filter((w) => numSet.has(w)).length;

  const points = intersetcted === 0 ? 0 : 2 ** (intersetcted - 1);
  res += points;
}

console.log(res);
