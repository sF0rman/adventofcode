import { readFileSync } from "fs";

const DAY = "Day 05";

// Using z for diagonal value
type Axis = "x" | "y" | "z";

interface Coordinates {
  x: number;
  y: number;
}

interface Line {
  startPoint: Coordinates;
  endPoint: Coordinates;
}

const loadInput = (): Line[] => {
  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray: Line[] = input.split(/\r\n/).map((row) => {
    const startStop: number[][] = row.split(" -> ").map((coord) => coord.split(",").map((value) => parseInt(value)));
    return {
      startPoint: {
        x: startStop[0][0],
        y: startStop[0][1],
      },
      endPoint: {
        x: startStop[1][0],
        y: startStop[1][1],
      },
    } as Line;
  });
  return inputArray;
};

const part1 = (input: Line[]): number => {
  let totalDangerousPoints: number = 0;
  const grid: number[][] = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

  const populatePoints = (start: number, end: number, axis: Axis, axisValue: number) => {
    for (let i = start; i <= end; i++) {
      if (axis === "x") {
        grid[axisValue][i]++;
        grid[axisValue][i] === 2 && totalDangerousPoints++;
      } else {
        grid[i][axisValue]++;
        grid[i][axisValue] === 2 && totalDangerousPoints++;
      }
    }
  };

  input.forEach((line: Line) => {
    const startX = line.startPoint.x;
    const startY = line.startPoint.y;
    const endX = line.endPoint.x;
    const endY = line.endPoint.y;

    if (startX === endX) {
      populatePoints(Math.min(startY, endY), Math.max(startY, endY), "y", startX);
    } else if (startY === endY) {
      populatePoints(Math.min(startX, endX), Math.max(startX, endX), "x", startY);
    }
  });

  console.log(DAY, "- part 1:", totalDangerousPoints);
  return totalDangerousPoints;
};

const part2 = (input: Line[]): number => {
  let totalDangerousPoints: number = 0;
  const grid: number[][] = [];

  const populatePoints = (x: number, y: number) => {
    grid[y] = grid[y] || [];
    grid[y][x] = grid[y][x] || 0;
    grid[y][x]++;
    grid[y][x] === 2 && totalDangerousPoints++;
  };

  input.forEach((line: Line) => {
    let startX = line.startPoint.x;
    let startY = line.startPoint.y;
    const endX = line.endPoint.x;
    const endY = line.endPoint.y;

    while (true) {
      populatePoints(startX, startY);
      if (startX === endX && startY === endY) {
        break;
      }
      if (startX < endX) {
        startX++;
      } else if (startX > endX) {
        startX--;
      }
      if (startY < endY) {
        startY++;
      } else if (startY > endY) {
        startY--;
      }
    }
  });

  console.log(DAY, "- part 2:", totalDangerousPoints);
  return totalDangerousPoints;
};

const run = () => {
  const input = loadInput();
  part1(input);
  part2(input);
};

export default run;
