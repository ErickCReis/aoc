const data = await Deno.readTextFile("input.txt");

const left = [];
const right = [];
for await (const line of data.split("\n")) {
  const [a, b] = line.split("   ");
  left.push(+a);
  right.push(+b);
}

left.sort();
right.sort();

let res = 0;
for (let i = 0; i < left.length; i++) {
  res += Math.abs(left[i] - right[i]);
}
console.log(res);
