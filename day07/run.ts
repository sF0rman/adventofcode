import { readFileSync } from "fs";

const DAY = "Day 07";

const loadInput = (): number[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray: number[] = input.split(",").map((n) => parseInt(n, 10));
  return inputArray;
};

const part1 = (input: number[]): number => {
  let minFuel = Infinity;
  for (let target = 0; target <= Math.max(...input); target++) {
    let fuel = input.reduce((total, value) => Math.abs(value - target) + total, 0);
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  console.log(DAY, "- part 1:", minFuel);
  return minFuel;
};

const part2 = (input: number[]): number => {
  let minFuel = Infinity;
  for (let target = 0; target <= Math.max(...input); target++) {
    let fuel = input.reduce(
      // n * (n + 1) / 2
      (t, v) => (Math.abs(v - target) * (Math.abs(v - target) + 1)) / 2 + t,
      0
    );
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  console.log(DAY, "- part 2:", minFuel);
  return minFuel;
};

const run = () => {
  const input = loadInput();
  part1(input);
  part2(input);
};

export default run;
