import { parseTen } from "../utils.ts";

export type Readings = number[][];
export type Point = { x: number; y: number };

export const Readings = {
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
};

export const Point = {
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

  adjacentPoints(point: Point, readings: Readings, countDiagonals = false) {
    const { width, height } = Readings.size(readings);

    const northPoint = Point.north(point);
    const southPoint = Point.south(point);

    const points = [
      northPoint,
      southPoint,
      Point.east(point),
      Point.west(point),
    ];

    if (countDiagonals) {
      points.push(
        Point.west(northPoint),
        Point.east(northPoint),
        Point.west(southPoint),
        Point.east(southPoint),
      );
    }

    return points.filter((p) =>
      p.x >= 0 && p.x < width && p.y >= 0 && p.y < height
    );
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

  parse(input: string): Point {
    const [x, y] = input.split(",").map(parseTen);
    return { x, y };
  },
};
