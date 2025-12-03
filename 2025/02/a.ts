let res = 0;
for await (const line of console) {
  for (const range of line.split(",")) {
    const [start, end] = range.split("-");

    for (let i = +start!; i <= +end!; i++) {
      const len = i.toString().length;
      if (len % 2 !== 0) {
        continue;
      }

      const s = i.toString().slice(0, len / 2);
      const e = i.toString().slice(len / 2);

      if (s === e) res += i;
    }
  }
}

console.log(res);
