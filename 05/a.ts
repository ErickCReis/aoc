let seeds: {
  index: number;
  value: number;
}[] = [];
let mapIndex = 0;

for await (const line of console) {
  if (seeds.length == 0) {
    const [_, seedsValue] = line.split(":");
    seeds = seedsValue
      .trim()
      .split(" ")
      .map((s) => ({ index: mapIndex, value: +s }));
    continue;
  }

  if (line === "") {
    mapIndex++;
    continue;
  }

  if (line.includes(":")) continue;

  const [dst, src, range] = line.trim().split(" ").map(Number);

  for (const seed of seeds) {
    if (seed.index === mapIndex) continue;

    if (seed.value >= src && seed.value < src + range) {
      seed.index = mapIndex;
      seed.value = dst + seed.value - src;
    }
  }
}

let min = Infinity;
for (const { value } of seeds) {
  if (value < min) min = value;
}

console.log(min);
