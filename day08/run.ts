import { readFileSync } from "fs";

const DAY = "Day 08";

type Position = "a" | "b" | "c" | "d" | "e" | "f" | "g";
const allPos: Position[] = ["a", "b", "c", "d", "e", "f", "g"];

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

const part2 = (input: string[]): number => {
  let top: Position;
  let topRight: Position;
  let bottomRight: Position;
  let topLeft: Position;
  let bottomLeft: Position;
  let middle: Position;
  let bottom: Position;
  let zero = "";
  let one = "";
  let two = "";
  let three = "";
  let four = "";
  let five = "";
  let six = "";
  let seven = "";
  let eight = "";
  let nine = "";

  let result = 0;

  input.forEach((row: string, index: number) => {
    const [def, vals] = row.split(" | ");
    const definition = def.split(" ").sort((a, b) => a.length - b.length);
    // We've sorted by length.
    // and can get these numbers from their position.
    one = definition.splice(0, 1)[0];
    seven = definition.splice(0, 1)[0];
    four = definition.splice(0, 1)[0];
    eight = definition.splice(-1, 1)[0];

    // THIS IS HORRIBLY DONE, BUT WORKS 0.o

    // we know that top is the one extra letter in 7 that doesn't exist in 1.
    top = [...seven].find((char) => ![...one].includes(char)) as Position;
    // 6 will be missing a letter from 8 that is used in number 1.
    six = definition.find(
      (value) => value.length === 6 && (![...value].includes(one[0]) || ![...value].includes(one[1]))
    );
    definition.splice(definition.indexOf(six), 1);
    // we can now set top right based on the missing character from 6
    topRight = [...one].find((char) => ![...six].includes(char)) as Position;
    // we should know also know bottom right from number 1 that isn't topRight
    bottomRight = [...one].find((char) => char !== topRight) as Position;
    // 2, 3 and 5 have 5 segments. 5 will be missing the top right
    five = definition.find((value) => value.length === 5 && ![...value].includes(topRight));
    definition.splice(definition.indexOf(five), 1);
    // and 2 will be missing the bottom right
    two = definition.find((value) => value.length === 5 && ![...value].includes(bottomRight));
    definition.splice(definition.indexOf(two), 1);
    // 3 will be the last 5-length left
    three = definition.find((value) => value.length === 5);
    definition.splice(definition.indexOf(three), 1);
    // we can get the bottom left by finding the character in 2 that doesn't exist in 3.
    bottomLeft = [...two].find((char) => ![...three].includes(char)) as Position;
    // 9 is missing the bottom left character of the remaining two
    nine = definition.find((value) => value.length === 6 && ![...value].includes(bottomLeft));
    definition.splice(definition.indexOf(nine), 1);
    // 0 will be the same last number standing
    zero = definition.find((value) => value.length === 6);
    definition.splice(definition.indexOf(zero), 1);

    if (definition.length > 0) {
      console.log("Didn't get them all...");
    }

    // And just because we can, we can find all the remaining positions
    middle = [...eight].find((char) => ![...zero].includes(char)) as Position;
    topLeft = [...five].find((char) => ![...three].includes(char)) as Position;
    bottom = [...eight].find(
      (char: Position) => ![top, topLeft, topRight, middle, bottomRight, bottomLeft].includes(char)
    ) as Position;

    const decode = (str: string) => {
      // Start by simply getting easy numbers based on their length
      if (str.length === 2) {
        return "1";
      } else if (str.length === 3) {
        return "7";
      } else if (str.length === 4) {
        return "4";
      } else if (str.length === 7) {
        return "8";
      } else if (str.length === 6) {
        // 0, 6 or 9
        if (!str.includes(middle)) {
          return "0"; // 0 is missing the middle segment
        } else if (!str.includes(topRight)) {
          return "6"; // 6 is missing the topright segment
        }
        return "9"; // or it has to be 9.
      } else if (str.length === 5) {
        // 2, 3 or 5
        if (!str.includes(topRight)) {
          return "5"; // 5 is only one missing topRight
        } else if (!str.includes(bottomLeft)) {
          return "3"; // 3 is missing bottom right if not 5
        }
        return "2"; // last option is 2
      } else {
        console.log("something went wrong");
      }
    };

    const number = vals.split(" ").map(decode).join("");
    const numberAsInt = parseInt(number);
    result += numberAsInt;
  });

  console.log(DAY, "- part 2:", result);
  return result;
};

const run = () => {
  const input = loadInput();
  part1(input);
  part2(input);
};

export default run;
