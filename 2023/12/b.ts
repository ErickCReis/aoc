let res = 0;

const cache = new Map<string, number>();
const cacheKey = (r: number, g: number) => `${r}_${g}`;
let row: string[] = [];
let groups: number[] = [];

for await (const line of console) {
  const [r, g] = line.split(" ");
  row = Array(5).fill(r).join("?").split("");
  groups = Array(5).fill(g).join(",").split(",").map(Number);
  cache.clear();

  res += check(0, 0);
}

console.log(res);

function check(rowIndex: number, groupIndex: number): number {
  const key = cacheKey(rowIndex, groupIndex);
  if (cache.has(key)) return cache.get(key)!;

  const r = row[rowIndex];
  const g = groups[groupIndex];

  if (groupIndex === groups.length) {
    for (let i = rowIndex; i < row.length; i++) {
      if (row[i] === "#") {
        cache.set(key, 0);
        return 0;
      }
    }

    cache.set(key, 1);
    return 1;
  }

  if (rowIndex > row.length) {
    cache.set(key, 0);
    return 0;
  }

  if (r === ".") {
    const count = check(rowIndex + 1, groupIndex);
    cache.set(key, count);
    return count;
  }

  const slice = row.slice(rowIndex, rowIndex + g);

  const safe =
    slice.length === g &&
    slice.every((r) => r === "?" || r === "#") &&
    row[rowIndex + g] !== "#";

  let count = 0;
  if (safe) {
    count += check(rowIndex + g + 1, groupIndex + 1);
  }

  if (r === "?") {
    count += check(rowIndex + 1, groupIndex);
  }

  cache.set(key, count);
  return count;
}
