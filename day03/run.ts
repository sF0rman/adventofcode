import { readFileSync } from "fs";

const DAY = "Day 03";

type bit = "0" | "1";

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

const part2 = (input: string[]): number => {
  const findMostCommonBit = (
    values: string[],
    index: number,
    oxygen: boolean
  ): bit => {
    let on = 0;
    let off = 0;

    for (let i = 0; i < values.length; i++) {
      values[i].charAt(index) === "0" ? off++ : on++;
    }

    if (oxygen) {
      return on >= off ? "1" : "0";
    }
    return on >= off ? "0" : "1";
  };

  const binarySize = input[0].length;
  let oxygenCriteria: string[] = [...input];
  let co2Criteria: string[] = [...input];
  let oxygen: string;
  let co2: string;

  for (let i = 0; i < binarySize; i++) {
    const oxBit = !oxygen && findMostCommonBit(oxygenCriteria, i, true);
    const co2Bit = !co2 && findMostCommonBit(co2Criteria, i, false);

    oxygenCriteria = oxygenCriteria.filter((item) => item.charAt(i) === oxBit);
    co2Criteria = co2Criteria.filter((item) => item.charAt(i) === co2Bit);

    if (oxygenCriteria.length === 1) oxygen = oxygenCriteria[0];
    if (co2Criteria.length === 1) co2 = co2Criteria[0];
  }

  const oxygenRating = parseInt(oxygen, 2);
  const co2Rating = parseInt(co2, 2);
  const result = oxygenRating * co2Rating;
  console.log(DAY, "- part 2", result);
  return result;
};

const run = () => {
  const input = loadInput();
  part1(input);
  part2(input);
};

export default run;
