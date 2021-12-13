import { add, parseTen } from "./utils.ts";

type Readings = number[][];
type Point = { x: number; y: number };

export function parseInput(input: string) {
  return input.trim().split("\n").map((r) => r.split("").map(parseTen));
}

const Readings = {
  width(readings: Readings) {
    return readings[0].length;
  },

  height(readings: Readings) {
    return readings.length;
  },

  size(readings: Readings) {
    return {
      width: Readings.width(readings),
      height: Readings.height(readings),
    };
  },

  lowPoints(readings: Readings) {
    const { width, height } = Readings.size(readings);

    const lowPoints: Point[] = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const point = { x, y };
        if (Point.isLow(point, readings)) lowPoints.push(point);
      }
    }

    return lowPoints;
  },
};

type Basin = { outerEdge: Point[]; points: Point[] };

const Basin = {
  grow(basin: Basin, readings: Readings): Basin {
    const outerEdge = basin.outerEdge.flatMap((p) => {
      const adjacent = Point.adjacentPoints(p, readings);
      const pointValue = Point.value(p, readings);

      return adjacent.filter((adjacentPoint) => {
        const value = Point.value(adjacentPoint, readings);

        return value > pointValue && value < 9;
      });
    });

    return {
      outerEdge: outerEdge.filter(Point.unique),
      points: [...basin.points, ...basin.outerEdge].filter(Point.unique),
    };
  },

  size(point: Point, readings: Readings) {
    let basin: Basin = { outerEdge: [point], points: [] };

    while (basin.outerEdge.length > 0) {
      basin = Basin.grow(basin, readings);
    }

    // Basin.print(basin, readings);

    return basin.points.length;
  },

  print(basin: Basin, readings: Readings) {
    const copy: (string | number)[][] = readings.map((r) => [...r]);

    basin.points.forEach((p) => {
      copy[p.y][p.x] = "x";
    });

    console.log(copy.map((l) => l.join("")).join("\n"));
  },
};

const Point = {
  north(point: Point) {
    return { x: point.x, y: point.y - 1 };
  },

  south(point: Point) {
    return { x: point.x, y: point.y + 1 };
  },

  east(point: Point) {
    return { x: point.x - 1, y: point.y };
  },

  west(point: Point) {
    return { x: point.x + 1, y: point.y };
  },

  adjacentPoints(point: Point, readings: Readings) {
    const { width, height } = Readings.size(readings);

    return [
      Point.north(point),
      Point.south(point),
      Point.east(point),
      Point.west(point),
    ].filter((p) => p.x >= 0 && p.x < width && p.y >= 0 && p.y < height);
  },

  isLow(point: Point, readings: Readings) {
    const pv = Point.value(point, readings);
    const nearPointValues = Point.adjacentPoints(point, readings).map((p) =>
      Point.value(p, readings)
    );

    return nearPointValues.every((v) => v > pv);
  },

  value(point: Point, readings: Readings) {
    return readings[point.y][point.x];
  },

  equal(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y;
  },

  unique(point: Point, index: number, source: Point[]) {
    return index === source.findIndex((p) => Point.equal(p, point));
  },
};

export function getLowPointScores(readings: Readings) {
  const lowPoints = Readings.lowPoints(readings);

  return lowPoints.map((p) => Point.value(p, readings) + 1);
}

export function getBasins(readings: Readings) {
  const lowPoints = Readings.lowPoints(readings);

  const basinSizes = lowPoints.map((point) => Basin.size(point, readings));

  return basinSizes;
}
