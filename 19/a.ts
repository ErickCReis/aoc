type Category = "x" | "m" | "a" | "s";

type Workflow =
  | {
      dest: "A" | "R" | string;
      category: true;
    }
  | {
      dest: "A" | "R" | string;
      category: Category;
      rating: number;
      comparison: "<" | ">";
    };

const workflows = new Map<string, Workflow[]>();
for await (const line of console) {
  if (line === "") break;

  const [name, conditions] = line.slice(0, -1).split("{");
  for (const instruction of conditions.split(",")) {
    const prevValues = workflows.get(name) ?? [];

    if (!instruction.includes(":")) {
      workflows.set(name, [
        ...prevValues,
        {
          dest: instruction,
          category: true,
        },
      ]);
      continue;
    }

    const [cond, dest] = instruction.split(":");
    const [_, category, comparison, rating] =
      cond.match(/([xmas])([<>])(\d+)/) ?? [];

    workflows.set(name, [
      ...prevValues,
      {
        dest,
        category,
        comparison,
        rating: +rating,
      } as Workflow,
    ]);
  }
}

let res = 0;
for await (const line of console) {
  const values = line.slice(1, -1).split(",");

  const parts = new Map<Category, number>();
  for (const value of values) {
    const [category, rating] = value.split("=") as [Category, string];
    parts.set(category, +rating);
  }

  let step = "in";
  while (step != "A" && step != "R") {
    const workflow = workflows.get(step);
    if (!workflow) break;

    for (const workflowStep of workflow) {
      if (workflowStep.category === true) {
        step = workflowStep.dest;
        break;
      }

      if (
        workflowStep.comparison === "<" &&
        parts.get(workflowStep.category)! < workflowStep.rating
      ) {
        step = workflowStep.dest;
        break;
      }

      if (
        workflowStep.comparison === ">" &&
        parts.get(workflowStep.category)! > workflowStep.rating
      ) {
        step = workflowStep.dest;
        break;
      }
    }
  }

  if (step === "A") {
    res += [...parts.values()].reduce((a, v) => a + v);
  }
}

console.log(res);

