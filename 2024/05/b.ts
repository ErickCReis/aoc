import { inputStream } from "../utils.ts";

let res = 0;
let readingRules = true;
const rules: Record<number, number[]> = {};

for await (const line of inputStream) {
  if (line === "") {
    readingRules = false;
    continue;
  }

  if (readingRules) {
    const [n1, n2] = line.split("|").map(Number);

    if (!rules[n1]) {
      rules[n1] = [n2];
    } else {
      rules[n1].push(n2);
    }
    continue;
  }

  const pages = line.split(",").map(Number);

  let valid = true;
  for (let i = 0; i < pages.length && valid; i++) {
    const rule = rules[pages[i]];

    if (!rule?.length) {
      continue;
    }

    for (let j = 0; j < i && valid; j++) {
      if (rule.includes(pages[j])) {
        valid = false;
      }
    }
  }

  if (valid) {
    continue;
  }

  pages.sort((a, b) => {
    const rule_a = rules[a];
    const rule_b = rules[b];

    if (rule_a?.includes(b)) {
      return -1;
    }

    if (rule_b?.includes(a)) {
      return 1;
    }

    return 0;
  });

  res += pages[Math.floor(pages.length / 2)];
}

console.log(res);
