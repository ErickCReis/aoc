const limits = {
  r: 12,
  g: 13,
  b: 14,
};

let res = 0;
for await (const line of console) {
  const [game, sets] = line.split(":");
  const gameId = Number(new RegExp("[0-9]+").exec(game)?.at(0));

  let isValid = true;
  for (const set of sets.split(";")) {
    if (!isValid) break;

    const cubes = set.split(",");

    for (const cube of cubes) {
      if (!isValid) break;

      const value = new RegExp("[0-9]+ [r|g|b]").exec(cube)?.at(0)?.split(" ")!;

      const qt = +value[0];
      const color = value[1] as keyof typeof limits;

      if (qt > limits[color]) {
        isValid = false;
      }
    }
  }

  if (isValid) res += gameId;
}

console.log(res);
