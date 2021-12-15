import { readFileSync } from "fs";

const loadInput = (): number[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split(/\r\n/).map((item) => parseInt(item));
  return inputArray;
};

const calculate = (input: number[]): number => {
  let result = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
      result++;
    }
  }
  return result;
};

const run = () => {
  const input = loadInput();
  const result = calculate(input);
  console.log(result);
};

export default run;
