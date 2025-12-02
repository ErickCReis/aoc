let dial = 50;
let res = 0;
for await (const line of console) {
  const dir = line.at(0);
  let mov = +line.slice(1);

  const fullRotations = Math.floor(mov / 100);
  res += fullRotations;
  mov -= fullRotations * 100;

  const prevIs0 = dial === 0;

  if (dir === "L") {
    dial -= mov;
  }

  if (dir === "R") {
    dial += mov;
  }

  if (dial === 0) {
    res++;
  }

  if (dial > 99) {
    dial %= 100;
    if (!prevIs0) res++;
  }

  if (dial < 0) {
    dial %= 100;
    dial += 100;
    if (!prevIs0) res++;
  }
}

console.log(res);
