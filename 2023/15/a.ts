let res = 0;
for await (const line of console) {
  for (const step of line.split(",")) {
    res += hash(step);
  }
}

console.log(res);

function hash(s: string) {
  return s
    .split("")
    .map((s) => s.charCodeAt(0))
    .reduce((a, v) => ((a + v) * 17) % 256, 0);
}
