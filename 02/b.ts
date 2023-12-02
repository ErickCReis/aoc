let res = 0;
for await (const line of console) {
  const [_, sets] = line.split(":");

  const minimumCubes = {
    r: 0,
    g: 0,
    b: 0,
  };
  for (const set of sets.split(";")) {
    const cubes = set.split(",");

    for (const cube of cubes) {
      const value = new RegExp("[0-9]+ [r|g|b]").exec(cube)?.at(0)?.split(" ")!;

      const qt = +value[0];
      const color = value[1] as keyof typeof minimumCubes;

      if (qt > minimumCubes[color]) {
        minimumCubes[color] = qt;
      }
    }
  }
  const power = minimumCubes["r"] * minimumCubes["g"] * minimumCubes["b"];
  res += power;
}

console.log(res);
