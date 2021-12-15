import { readFileSync } from "fs";

const DAY = "Day 03";

const loadInput = (): string[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split(/\r\n/);
  return inputArray;
};

const part1 = (input: string[]): number => {
  const binarySize = input[0].length;
  const total: number[][] = Array.from(new Array(binarySize), () => [0, 0]);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < binarySize; j++) {
      input[i].charAt(j) === "0" ? total[j][0]++ : total[j][1]++;
    }
  }

  let gammaBin: string = "";
  let epsilonBin: string = "";
  total.forEach((item) => {
    if (item[0] > item[1]) {
      gammaBin += "0";
      epsilonBin += "1";
    } else {
      gammaBin += "1";
      epsilonBin += "0";
    }
  });

  const gamma = parseInt(gammaBin, 2);
  const epsilon = parseInt(epsilonBin, 2);
  const result = gamma * epsilon;
  console.log(DAY, "- part 1", result);
  return result;
};

const run = () => {
  const input = loadInput();
  part1(input);
};

export default run;
