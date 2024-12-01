type Dir = "U" | "D" | "L" | "R";
type Position = {
  x: number;
  y: number;
};
const curr = {
  x: 0,
  y: 0,
} satisfies Position;

const vertices: Position[] = [];
vertices.push({ ...curr });

let perimeter = 0;

for await (const line of console) {
  const code = line.split(" ")[2];
  const distance = parseInt(code.substring(2, 7), 16);
  const dir = ["R", "D", "L", "U"][Number(code.at(-2))];

  switch (dir) {
    case "U":
      curr.y = curr.y - distance;
      break;
    case "D":
      curr.y = curr.y + distance;
      break;
    case "L":
      curr.x = curr.x - distance;
      break;
    case "R":
      curr.x = curr.x + distance;
      break;
  }

  vertices.push({ ...curr });
  perimeter += distance;
}

function calcPolygonArea(vertices: Position[]) {
  let total = 0;

  for (let i = 0, l = vertices.length; i < l; i++) {
    const addX = vertices[i].x;
    const addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
    const subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
    const subY = vertices[i].y;

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total);
}

const res =
  calcPolygonArea(vertices) + 1 - Math.floor(perimeter / 2) + perimeter;
console.log(res);
