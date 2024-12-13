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

function findPrize({ a, b, prize }: Machine) {
  let i = 1;
  do {
    const tempX = (prize[0] - a[0] * i) / b[0];
    const tempY = (prize[1] - a[1] * i) / b[1];

    if (tempX % 1 === 0 && tempY % 1 === 0 && tempX === tempY) {
      return i * 3 + tempX;
    }

    i++;
  } while (i < 100);

  return 0;
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
    tempMachine.prize = [+prize[1], +prize[2]];

    machines.push(tempMachine);
    tempMachine = createMachine();
  }
}

let res = 0;
for (const machine of machines) {
  res += findPrize(machine);
}

console.log(res);
