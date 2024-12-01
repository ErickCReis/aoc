let res = 0;
for await (const line of console) {
  let first: string = "";
  let last: string = "";
  for (let i = 0; i < line.length; i++) {
    const cStart = line.at(i)!;
    if (first === "" && Number.isInteger(+cStart)) {
      first = cStart;
    }

    const cEnd = line.at(line.length - i - 1)!;
    if (last === "" && Number.isInteger(+cEnd)) {
      last = cEnd;
    }
  }

  res += Number(first + last);
}

console.log(res);
