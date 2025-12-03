let res = 0;
for await (const line of console) {
  for (const range of line.split(",")) {
    const [start, end] = range.split("-");

    for (let i = +start!; i <= +end!; i++) {
      const len = i.toString().length;

      for (let size = 1; size <= len / 2; size++) {
        if (len % size !== 0) {
          continue;
        }

        const pattern = i.toString().slice(0, size);
        const regex = new RegExp(`(${pattern}){${len / size}}`);

        // console.log(
        //   "testing",
        //   i,
        //   `(${pattern}){${len / size}}`,
        //   regex.test(i.toString()),
        // );

        if (regex.test(i.toString())) {
          res += i;
          break;
        }
      }
    }
  }
}

console.log(res);
