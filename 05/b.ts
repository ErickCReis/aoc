let seeds: {
  mapIndex: number;
  range: [number, number];
}[] = [];
let mapIndex = 0;

for await (const line of console) {
  if (seeds.length == 0) {
    const [_, seedsRanges] = line.split(":");

    seeds = seedsRanges.match(/\d+ \d+/g)!.map((range) => {
      const [start, length] = range.split(" ").map(Number);
      return {
        mapIndex,
        range: [start, start + length - 1],
      };
    });

    continue;
  }

  if (line == "") {
    mapIndex++;
    continue;
  }

  if (line.includes(":")) continue;

  const [dst, src, range] = line.trim().split(" ").map(Number);

  for (const seed of seeds) {
    if (seed.mapIndex === mapIndex) {
      continue;
    }

    if (seed.range[0] > src + range || seed.range[1] < src) continue;

    if (seed.range[0] < src && seed.range[1] > src + range) {
      // console.log("split: seed include range", seed.range, [src, src + range]);

      seeds.push({
        mapIndex,
        range: [dst, dst + range],
      });
      seeds.push({
        mapIndex,
        range: [src + range + 1, seed.range[1]],
      });

      seed.mapIndex = mapIndex;
      seed.range[1] = src - 1;

      continue;
    }

    if (seed.range[0] > src && seed.range[1] < src + range) {
      // console.log("split: seed inside range", seed.range, [src, src + range]);

      seed.mapIndex = mapIndex;
      seed.range = [dst + seed.range[0] - src, dst + seed.range[1] - src];
      continue;
    }

    if (seed.range[0] > src) {
      // console.log("split: seed on right", seed.range, [src, src + range]);

      seeds.push({
        mapIndex,
        range: [dst + seed.range[0] - src, dst + range],
      });

      seed.mapIndex = mapIndex;
      seed.range[0] = src + range + 1;

      continue;
    }

    if (seed.range[1] < src + range) {
      // console.log("split: seed on left", seed.range, [src, src + range]);

      seeds.push({
        mapIndex,
        range: [dst, dst + seed.range[1] - src],
      });

      seed.mapIndex = mapIndex;
      seed.range[1] = src - 1;

      continue;
    }
  }
}

let min = Infinity;
for (const { range } of seeds) {
  if (range[0] < min) min = range[0];
}

console.log(min);
