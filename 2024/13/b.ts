import { inputStream } from "../utils.ts";

type Machine = {
  a: [number, number];
  b: [number, number];
  prize: [number, number];
};

const machines: Machine[] = [];

function createMachine(): Machine {
  return {
    a: [0, 0],
    b: [0, 0],
    prize: [0, 0],
  };
}

function solve(
  a0: number,
  a1: number,
  b0: number,
  b1: number,
  p0: number,
  p1: number
) {
  // Calculate the determinant
  const delta = a0 * b1 - a1 * b0;

  // Check if the determinant is zero (no unique solution)
  if (delta === 0) {
    return null;
  }

  // Use Cramer's Rule to solve for x and y
  const x = (p0 * b1 - p1 * b0) / delta;
  const y = (a0 * p1 - a1 * p0) / delta;

  return { x, y };
}

function findPrize({ a, b, prize }: Machine) {
  const res = solve(...a, ...b, ...prize);

  if (!res || res.x % 1 !== 0 || res.y % 1 !== 0) {
    return 0;
  }

  return res.x * 3 + res.y;
}

let tempMachine = createMachine();
for await (const line of inputStream) {
  const buttonA = /Button A: X\+(\d+), Y\+(\d+)/g.exec(line);
  if (buttonA) {
    tempMachine.a = [+buttonA[1], +buttonA[2]];
  }

  const buttonB = /Button B: X\+(\d+), Y\+(\d+)/g.exec(line);
  if (buttonB) {
    tempMachine.b = [+buttonB[1], +buttonB[2]];
  }

  const prize = /Prize: X=(\d+), Y=(\d+)/g.exec(line);
  if (prize) {
    tempMachine.prize = [
      +prize[1] + 10_000_000_000_000,
      +prize[2] + 10_000_000_000_000,
    ];

    machines.push(tempMachine);
    tempMachine = createMachine();
  }
}

let res = 0;
for (const machine of machines) {
  res += findPrize(machine);
}

console.log(res);
