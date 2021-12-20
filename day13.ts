import { parseTen } from "./utils.ts";
import { Point } from "./src/grid.ts";

type FoldInstruction = {
  axis: "x" | "y";
  index: number;
};

const FoldInstruction = {
  parse(input: string): FoldInstruction {
    const [along, index] = input.split("=");

    return {
      axis: along[along.length - 1] as FoldInstruction["axis"],
      index: parseTen(index),
    };
  },
};

type Grid = Point[];
type Matrix = boolean[][];

export const Grid = {
  from(dots: Point[]): Grid {
    return dots;
  },

  fold(grid: Grid, instruction: FoldInstruction): Grid {
    const axis = instruction.axis;

    return grid.map((point) => {
      if (point[axis] > instruction.index) {
        return {
          ...point,
          [axis]: point[axis] - ((point[axis] - instruction.index) * 2),
        };
      } else {
        return point;
      }
    }).filter(Point.unique);
  },

  toMatrix(grid: Grid): Matrix {
    const maxX = grid.sort((a, b) => b.x - a.x)[0].x;
    const maxY = grid.sort((a, b) => b.y - a.y)[0].y;

    const matrix = new Array(maxY + 1).fill(null).map((_) =>
      new Array(maxX + 1).fill(false)
    );

    grid.forEach((point) => {
      matrix[point.y][point.x] = true;
    });

    return matrix;
  },
};

export const Matrix = {
  toString(matrix: Matrix) {
    const chars = matrix.map((row) => row.map((x) => x ? "#" : ".").join(""));

    return chars.join("\n");
  },
};

export function parseInput(rawInput: string) {
  const [grid, folds] = rawInput.trim().split("\n\n");

  const dots = grid.split("\n").map(Point.parse);
  const foldInstructions = folds.split("\n").map(FoldInstruction.parse);

  return { dots, foldInstructions };
}
