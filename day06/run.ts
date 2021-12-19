import { readFileSync } from "fs";

const DAY = "Day 06";

const loadInput = (): number[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray: number[] = input.split(",").map((n) => parseInt(n, 10));
  return inputArray;
};

const part1 = (input: number[], days: number): number => {
  const fish = [...input]; // Copy this to prevent breaking part2.
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

  console.log(DAY, "- part 1:", fish.length);
  return fish.length;
};

const part2 = (input: number[], days: number): number => {
  // count number of fish for each each age 0-8 (9 numbers)
  // To get the start-count.
  let fishCount = Array(9).fill(0);
  input.forEach((f) => (fishCount[f] += 1));

  // Each day, shift all numbers down the array by removing index 0
  // Add the fish from index 0 to index 6
  // add the same number to the end of array (index 8) as new fish
  for (let i = 1; i <= days; i++) {
    const born = fishCount.shift();
    fishCount[6] += born;
    fishCount.push(born);
  }

  // Add all fish from all array-positions together for result.
  const result = fishCount.reduce((count, total) => count + total);
  console.log(DAY, "- part 2:", result);
  return result;
};

const run = () => {
  const input = loadInput();
  part1(input, 80);
  part2(input, 256);
};

export default run;
