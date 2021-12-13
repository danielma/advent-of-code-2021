import { add, parseTen } from "./utils.ts";

type Readings = number[][];
type Point = { x: number; y: number };

export function parseInput(input: string) {
  return input.trim().split("\n").map((r) => r.split("").map(parseTen));
}

function pointValue(point: Point, readings: Readings) {
  return readings[point.y][point.x];
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
    const pv = pointValue(point, readings);
    const nearPointValues = Point.adjacentPoints(point, readings).map((p) =>
      pointValue(p, readings)
    );

    return nearPointValues.every((v) => v > pv);
  },
};

export function getLowPointScores(readings: Readings) {
  const lowPoints = Readings.lowPoints(readings);

  return lowPoints.map((p) => pointValue(p, readings) + 1);
}
