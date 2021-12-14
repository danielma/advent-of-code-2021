import { parseTen } from "./utils.ts";
import { Point, Readings } from "./src/sea_floor.ts";

export function parseInput(rawInput: string) {
  return rawInput.trim().split("\n").map((l) => l.split("").map(parseTen));
}

export class OctopiSimulator {
  matrix: Readings;
  totalFlashes = 0;
  steps = 0;

  constructor(matrix: Readings) {
    this.matrix = matrix;
  }

  simulate(days = 1) {
    for (let i = 0; i < days; i++) {
      this.step();
    }
  }

  step() {
    this.eachPoint((p) => this.incrementPoint(p));

    this.eachPoint((p) => {
      const value = this.valueAt(p);

      if (value > 9) {
        this.setValueAt(p, 0);
      }
    });

    this.steps++;
  }

  incrementPoint(point: Point) {
    const value = this.valueAt(point);
    const nextValue = value + 1;

    this.setValueAt(point, nextValue);

    if (nextValue === 10) {
      this.flashPoint(point);
    }
  }

  flashPoint(point: Point) {
    this.totalFlashes++;
    this.adjacentPoints(point).forEach((p) => this.incrementPoint(p));
  }

  valueAt(point: Point) {
    return Point.value(point, this.matrix);
  }

  setValueAt(point: Point, value: number) {
    this.matrix[point.y][point.x] = value;
  }

  adjacentPoints(point: Point) {
    return Point.adjacentPoints(point, this.matrix, true);
  }

  eachPoint(cb: (p: Point) => void) {
    const { width, height } = Readings.size(this.matrix);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cb({ x, y });
      }
    }
  }

  isFullFlash() {
    return this.matrix.every((row) => row.every((v) => v === 0));
  }
}
