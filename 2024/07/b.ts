import { inputStream } from "../utils.ts";

function check(numbers: number[], expected: number): boolean {
  if (expected % 1 !== 0) {
    return false;
  }

  if (numbers.length <= 2) {
    const [n1, n2] = numbers;
    const r1 = n1 + n2;
    const r2 = n1 * n2;
    const r3 = +(n1.toString() + n2.toString());

    return r1 === expected || r2 === expected || r3 === expected;
  }

  const last = numbers.pop()!;
  const op1 = check([...numbers], expected - last);
  const op2 = check([...numbers], expected / last);

  const end = +expected.toString().slice(-last.toString().length);
  const newExpected = +expected.toString().slice(0, -last.toString().length);
  const op3 = last === end && check([...numbers], newExpected);

  return op1 || op2 || op3;
}

let res = 0;
for await (const line of inputStream) {
  const [result, rest] = line.split(": ");

  const expected = +result;
  const numbers = rest.split(" ").map(Number);

  if (check(numbers, expected)) {
    res += expected;
    continue;
  }
}

console.log(res);
