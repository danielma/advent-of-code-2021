type Point = { x: number; y: number };

class BingoBoard {
  width: number;
  height: number;
  matrix: number[][];
  marked: number[][];

  static parse(rawInput: string) {
    const rows = rawInput.split("\n").map((r) =>
      r.trim().split(/\W+/).map(parseTen)
    );

    return new BingoBoard(rows);
  }

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.width = matrix[0].length;
    this.height = matrix.length;
    this.marked = new Array(this.height).fill(null).map(() =>
      new Array(this.width).fill(null)
    );
  }

  sumUnmarked() {
    const sumMarked = this.marked.flat().filter(Number.isInteger).reduce(add);
    const sumTotal = this.matrix.flat().filter(Number.isInteger).reduce(add);

    return sumTotal - sumMarked;
  }

  isWinning() {
    const horizontalWin = this.marked.find((r) => r.every(Number.isInteger));

    if (horizontalWin) return true;

    const verticalWin = new Array(this.height).fill(true).find((_v, index) =>
      this.marked.every((r) => Number.isInteger(r[index]))
    );

    return !!verticalWin;
  }

  playNumber(number: number) {
    let found = false;
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.height; columnIndex++) {
        const value = this.matrix[rowIndex][columnIndex];

        if (value === number) {
          this.marked[rowIndex][columnIndex] = value;
          found = true;

          break;
        }
      }

      if (found) break;
    }
  }
}

function parseTen(n: string) {
  return parseInt(n, 10);
}

function add(x: number, y: number) {
  return x + y;
}

class BingoGame {
  boards: BingoBoard[];
  wonBoards: boolean[];
  numbers: number[];
  playIndex = -1;

  static processRawInput(
    input: string,
  ): { boards: BingoBoard[]; numbers: number[] } {
    const [rawNumbers, ...rawBoards] = input.split("\n\n");

    const numbers = rawNumbers.split(",").map(parseTen);
    const boards = rawBoards.map(BingoBoard.parse);

    return { numbers, boards };
  }

  static parse(rawInput: string) {
    return new BingoGame(BingoGame.processRawInput(rawInput));
  }

  constructor(
    { numbers, boards }: { numbers: number[]; boards: BingoBoard[] },
  ) {
    this.numbers = numbers;
    this.boards = boards;
    this.wonBoards = new Array(boards.length).fill(false);
  }

  playToFirstWin(): BingoBoard | null {
    while (this.playOneNumber()) {
      const winningBoard = this.getWinningBoard();

      if (winningBoard) {
        return winningBoard;
      }
    }

    this.boards.forEach((x) => console.log(x));

    return null;
  }

  playToLastWin(): BingoBoard | null {
    while (this.playOneNumber()) {
      let justWon = -1
      this.boards.forEach((b, index) => {
        if (b.isWinning() && this.wonBoards[index] === false) {
          this.wonBoards[index] = true;
          justWon = index;
        }
      });

      

      if (this.wonBoards.every((x) => x) && justWon > -1) {
        return this.boards[justWon];
      }
    }

    this.boards.forEach((x) => console.log(x));

    return null;
  }

  currentNumber() {
    return this.numbers[this.playIndex];
  }

  private playOneNumber() {
    this.playIndex += 1;
    const nextNumber = this.numbers[this.playIndex];

    if (Number.isInteger(nextNumber)) {
      this.boards.forEach((b) => b.playNumber(nextNumber as number));

      return true;
    } else {
      return false;
    }
  }

  private getWinningBoard() {
    return this.boards.find((b) => b.isWinning());
  }
}

export function processBingo(input: string): BingoGame {
  return BingoGame.parse(input);
}
