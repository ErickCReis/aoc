let res = 1;
const raceTimes: number[] = [];
for await (const line of console) {
  if (line.startsWith("Time:")) {
    for (const time of line.match(/\d+/g) ?? []) {
      raceTimes.push(+time);
    }

    continue;
  }

  if (line.startsWith("Distance:")) {
    let raceIndex = 0;
    for (const record of line.match(/\d+/g) ?? []) {
      const time = raceTimes[raceIndex++];

      let newRecordCount = 0;
      for (let t = 1; t <= time / 2; t++) {
        const distance = t * (time - t);

        if (distance > +record) {
          newRecordCount += 2;
        }
      }

      res *= time % 2 ? newRecordCount : newRecordCount - 1;
    }
  }
}

console.log(res);
