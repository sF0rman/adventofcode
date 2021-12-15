import { readFileSync } from "fs";

type direction = "forward" | "up" | "down";

interface instructionSet {
  dir: direction;
  val: number;
}

interface position {
  depth: number;
  distance: number;
}

const DAY = "Day 02";

const loadInput = (): instructionSet[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const formatted: instructionSet[] = input.split(/\r\n/).map((item) => {
    const instructionSet = item.split(" ");
    return {
      dir: instructionSet[0],
      val: parseInt(instructionSet[1]),
    } as instructionSet;
  });
  return formatted;
};

const part1 = (input: instructionSet[]): number => {
  let position: position = { depth: 0, distance: 0 };
  for (let i = 0; i < input.length; i++) {
    switch (input[i].dir) {
      case "forward":
        position.distance = position.distance + input[i].val;
        break;
      case "up":
        position.depth = position.depth - input[i].val;
        break;
      case "down":
        position.depth = position.depth + input[i].val;
        break;
    }
  }
  const result = position.depth * position.distance;
  console.log(DAY, "- part 1", result);
  return result;
};

const run = (): void => {
  const input = loadInput();
  part1(input);
};

export default run;
