import { readFileSync } from "fs";

const DAY = "Day 04";

type Inputs = number[];

interface BoardCell {
  value: number;
  marked: boolean;
  row: number;
  col: number;
}
type Board = {
  complete: boolean;
  cells: BoardCell[];
};

let inputStream: Inputs;
let boards: Board[] = [];

const loadInput = (): void => {
  const createBoards = (boardData: string[]): void => {
    boardData.forEach((boardSet, i) => {
      boards.push({
        complete: false,
        cells: boardSet
          .split(/\s+|\r\n/)
          .map((n) => parseInt(n, 10))
          .map(
            (cellValue, i) =>
              ({
                value: cellValue,
                marked: false,
                row: Math.floor(i / 5) + 1,
                col: (i % 5) + 1,
              } as BoardCell)
          ),
      });
    });
  };

  const input = readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  const inputArray = input.split(/\r\n\r\n/);
  inputStream = inputArray[0].split(",").map((n) => parseInt(n, 10));
  createBoards(inputArray.slice(1, inputArray.length));
};

const testWinCondition = (board: Board) => {
  for (let i = 1; i <= 5; i++) {
    // Filter by row or col. If we get any with length 5, we have a winning board.
    const rows = board.cells.filter((b) => b.row === i && b.marked);
    const cols = board.cells.filter((b) => b.col === i && b.marked);
    if (rows.length === 5 || cols.length === 5) {
      return true;
    }
  }
};

const part1 = (): number => {
  let winningBoard: Board;
  let finalNumber: number;

  for (let i = 0; i < inputStream.length && !winningBoard; i++) {
    const value = inputStream[i];
    for (let j = 0; j < boards.length && !winningBoard; j++) {
      const board = boards[j];
      for (let k = 0; k < board.cells.length && !winningBoard; k++) {
        const cell = board.cells[k];
        if (!cell.marked && cell.value === value) {
          cell.marked = true;
          if (testWinCondition(board)) {
            winningBoard = board;
            finalNumber = value;
            break;
          }
        }
      }
    }
  }

  let totalUnmarked = 0;
  winningBoard.cells.forEach((cell) => {
    if (!cell.marked) {
      totalUnmarked += cell.value;
    }
  });
  const result = totalUnmarked * finalNumber ?? 0;
  console.log(DAY, "- part 1:", result);
  return result;
};

const part2 = () => {
  let losingBoard: Board;
  let finalNumber: number;
  let completedBoards = 0;
  let totalBoards = boards.length;

  for (let i = 0; i < inputStream.length && !losingBoard; i++) {
    const value = inputStream[i];
    for (let j = 0; j < boards.length && !losingBoard; j++) {
      const board = boards[j];
      for (let k = 0; k < board.cells.length && !board.complete && !losingBoard; k++) {
        const cell = board.cells[k];
        if (!cell.marked && cell.value === value) {
          cell.marked = true;
          if (testWinCondition(board)) {
            completedBoards++;
            board.complete = true;
            if (completedBoards === totalBoards) {
              losingBoard = board;
              finalNumber = value;
            }
          }
        }
      }
    }
  }

  let totalUnmarked = 0;
  losingBoard.cells.forEach((cell) => {
    if (!cell.marked) {
      totalUnmarked += cell.value;
    }
  });
  
  const result = totalUnmarked * finalNumber ?? 0;
  console.log(DAY, "- part 2:", result);
  return result;
};

const run = () => {
  loadInput();
  part1();
  part2();
};

export default run;
