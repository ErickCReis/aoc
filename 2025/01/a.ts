let dial = 50;
let res = 0;
for await (const line of console) {
  const dir = line.at(0);
  const mov = +line.slice(1);

  if (dir === "L") {
    dial -= mov;
  }

  if (dir === "R") {
    dial += mov;
  }

  dial %= 100;
  if (dial < 0) {
    dial += 100;
  }

  if (dial === 0) {
    res++;
  }
}

console.log(res);
