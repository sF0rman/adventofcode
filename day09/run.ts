import { readFileSync } from "fs";

const DAY = "Day 09";

const loadInput = (): number[][] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split("\r\n").map((line) => line.split("").map((char) => parseInt(char, 10)));
  return inputArray;
};

const part1 = (input: number[][]) => {
  const lengthY = input.length;
  const lengthX = input[0].length;

  let lowPoints: number[] = [];

  for (let y = 0; y < lengthY; y++) {
    for (let x = 0; x < lengthX; x++) {
      let left = x > 0 ? input[y][x] < input[y][x - 1] : true;
      let right = x < lengthX - 1 ? input[y][x] < input[y][x + 1] : true;
      let up = y > 0 ? input[y][x] < input[y - 1][x] : true;
      let down = y < lengthY - 1 ? input[y][x] < input[y + 1][x] : true;

      if (up && down && left && right) {
        lowPoints.push(input[y][x] + 1);
      }
    }
  }

  const result = lowPoints.reduce((total, value) => value + total);
  console.log(DAY, "- part 1:", result);
  return result;
};

const run = () => {
  const input = loadInput();
  part1(input);
};

export default run;
