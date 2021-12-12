type Point = { x: number; y: number };

const Point = {
  parse(input: string): Point {
    const [start, end] = input.split(",");
    return { x: parseTen(start), y: parseTen(end) };
  },

  min(a: Point, b: Point) {
    return Point.sort(a, b)[0];
  },

  sort(a: Point, b: Point) {
    if (a.x === b.x) {
      return a.y < b.y ? [a, b] : [b, a];
    } else {
      return a.x < b.x ? [a, b] : [b, a];
    }
  },

  equal(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y;
  },

  onlyUnique(value: Point, index: number, self: Point[]) {
    return self.findIndex((o) => Point.equal(value, o)) === index;
  },
};

function moveTowards(a: number, b: number, steps: number) {
  if (a === b) {
    return a;
  } else if (a < b) {
    return a + steps;
  } else {
    return a - steps;
  }
}

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
    const [minPoint, maxPoint] = Point.sort(this.startPoint, this.endPoint);

    const points = [];

    const steps = (maxPoint.x - minPoint.x) || (maxPoint.y - minPoint.y);

    for (let i = 0; i < steps + 1; i++) {
      const x = moveTowards(minPoint.x, maxPoint.x, i);
      const y = moveTowards(minPoint.y, maxPoint.y, i);
      points.push({ x, y });
    }

    return points;
  }
}

class SeaFloor {
  matrix: number[][] = [];

  static from(
    commands: DrawCommand[],
    { ignoreDiagonals }: { ignoreDiagonals: boolean } = {
      ignoreDiagonals: false,
    },
  ) {
    const floor = new SeaFloor();

    commands.forEach((command) => {
      if (ignoreDiagonals && !command.isStraight()) return;

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

  const floor = SeaFloor.from(commands, { ignoreDiagonals: true });

  return floor;
}

export function processSeaFloorWithDiagonals(input: string) {
  const commands = input.trim().split("\n").map(DrawCommand.parse);

  const floor = SeaFloor.from(commands);

  return floor;
}
