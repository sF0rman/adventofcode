import { readFileSync } from "fs";

const DAY = "Day 06";

const loadInput = (): number[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray: number[] = input.split(",").map((n) => parseInt(n));
  return inputArray;
};

const part1 = (input: number[], days: number): number => {
  const fish = input;
  for (let i = 1; i <= days; i++) {
    let count = fish.length;
    for (let f = 0; f < count; f++) {
      if (fish[f] === 0) {
        fish[f] = 6;
        fish.push(8);
      } else {
        fish[f]--;
      }
    }
  }

  console.log(DAY, "- part 1;", fish.length);
  return fish.length;
};

const run = () => {
  const input = loadInput();
  part1(input, 80);
};

export default run;
