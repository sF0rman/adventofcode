import { readFileSync } from "fs";

const DAY = "Day 01";

const loadInput = (): number[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split(/\r\n/).map((item) => parseInt(item));
  return inputArray;
};

const part1 = (input: number[]): number => {
  let result = 0;
  for (let i = 1; i < input.length; i++) {
    input[i - 1] < input[i] && result++;
  }
  console.log(DAY, "- part 1:", result);
  return result;
};

const part2 = (input: number[]): number => {
  let result = 0;
  for (let i = 3; i < input.length; i++) {
    const previous = input[i - 3] + input[i - 2] + input[i - 1];
    const current = input[i - 2] + input[i - 1] + input[i];
    current > previous && result++;
  }
  console.log(DAY, "- part 2", result);
  return result;
};

const run = (): void => {
  const input = loadInput();
  part1(input);
  part2(input);
};

export default run;
