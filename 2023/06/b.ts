let res = 1;
let raceTime = 0;
for await (const line of console) {
  if (line.startsWith("Time:")) {
    raceTime = Number(line.match(/\d+/g)?.join(""));

    continue;
  }

  if (line.startsWith("Distance:")) {
    const record = Number(line.match(/\d+/g)?.join(""));

    let newRecordCount = 0;
    for (let t = 1; t <= raceTime / 2; t++) {
      const distance = t * (raceTime - t);

      if (distance > record) {
        newRecordCount += 2;
      }
    }

    res *= raceTime % 2 ? newRecordCount : newRecordCount - 1;
  }
}

console.log(res);
