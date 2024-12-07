import { inputStream } from "../utils.ts";

function check(numbers: number[], expected: number): boolean {
  if (numbers.length <= 2) {
    const result1 = numbers[0] + numbers[1];
    const result2 = numbers[0] * numbers[1];
    return result1 === expected || result2 === expected;
  }

  const last = numbers.pop()!;
  return (
    check([...numbers], expected - last) || check([...numbers], expected / last)
  );
}

let res = 0;
for await (const line of inputStream) {
  const [result, rest] = line.split(": ");

  const expected = +result;
  const numbers = rest.split(" ").map(Number);

  if (check(numbers, expected)) {
    res += expected;
  }
}

console.log(res);
