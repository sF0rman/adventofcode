import { readFileSync } from "fs";

const DAY = "Day 08";

const loadInput = (): string[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split("\r\n");
  return inputArray;
};

const part1 = (input: string[]): number => {
  let total = 0;

  input.forEach((row) => {
    const vals = row.split(" | ")[1];
    const active = vals.split(" ");
    active.forEach((item) => {
      [2, 3, 4, 7].includes(item.length) && total++;
    });
  });

  console.log(DAY, "- part 1:", total);
  return total;
};

const run = () => {
  const input = loadInput();
  part1(input);
};

export default run;
