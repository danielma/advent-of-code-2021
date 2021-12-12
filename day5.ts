type Point = { x: number; y: number };

const Point = {
  parse(input: string): Point {
    const [start, end] = input.split(",");
    return { x: parseTen(start), y: parseTen(end) };
  },

  equal(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y;
  },

  onlyUnique(value: Point, index: number, self: Point[]) {
    return self.findIndex((o) => Point.equal(value, o)) === index;
  },
};

function parseTen(x: string) {
  return parseInt(x, 10);
}

class DrawCommand {
  startPoint: Point;
  endPoint: Point;

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  static parse(rawInput: string) {
    const [start, end] = rawInput.split(" -> ").map(Point.parse);

    return new DrawCommand(start, end);
  }

  isStraight() {
    return (this.startPoint.x === this.endPoint.x) ||
      (this.startPoint.y === this.endPoint.y);
  }

  eachPoint(cb: (p: Point) => void) {
    this.genPoints().forEach(cb);
  }

  private genPoints(): Point[] {
    const minX = Math.min(this.startPoint.x, this.endPoint.x);
    const maxX = Math.max(this.startPoint.x, this.endPoint.x);
    const minY = Math.min(this.startPoint.y, this.endPoint.y);
    const maxY = Math.max(this.startPoint.y, this.endPoint.y);

    const points = [];

    for (let i = minX; i <= maxX; i++) {
      points.push({ x: i, y: minY });
    }

    for (let i = minY; i <= maxY; i++) {
      points.push({ x: maxX, y: i });
    }

    return points.filter(Point.onlyUnique);
  }
}

class SeaFloor {
  matrix: number[][] = [];

  static from(commands: DrawCommand[]) {
    const floor = new SeaFloor();

    commands.forEach((command) => {
      if (!command.isStraight()) return;

      command.eachPoint((p) => {
        floor.incrementPoint(p);
      });
    });

    return floor;
  }

  incrementPoint(point: Point) {
    if (typeof this.matrix[point.y] === "undefined") {
      this.matrix[point.y] = [];
    }

    if (typeof this.matrix[point.y][point.x] === "undefined") {
      this.matrix[point.y][point.x] = 1;
    } else {
      this.matrix[point.y][point.x] += 1;
    }
  }

  spotsWithMinDanger(danger: number) {
    return this.matrix.flat().filter((x) => x >= danger);
  }
}

export function processSeaFloor(input: string) {
  const commands = input.trim().split("\n").map(DrawCommand.parse);

  const floor = SeaFloor.from(commands);

  return floor;
}
