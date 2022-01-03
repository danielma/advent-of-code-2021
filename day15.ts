import { parseTen } from "./utils.ts";
import { Grid, Point } from "./src/grid.ts";

type PointCacheKey = string;

function pointToCacheKey(point: Point): PointCacheKey {
  return `${point.x},${point.y}`;
}

function cacheKeyToPoint(c: PointCacheKey): Point {
  const [x, y] = c.split(",").map(parseTen);
  return { x, y };
}

export type Path = {
  // locations: Point[];
  lastLocation: Point;

  visited: Record<PointCacheKey, true>;
};

const Path = {
  start(): Path {
    return Path.visit(Path.empty(), { x: 0, y: 0 });
  },

  empty(): Path {
    return {
      // locations: [],
      lastLocation: { x: -1, y: -1 },
      visited: {},
    };
  },

  visit(path: Path, location: Point): Path {
    return {
      // locations: path.locations.concat([location]),
      visited: { ...path.visited, [pointToCacheKey(location)]: true },
      lastLocation: location,
    };
  },

  hasVisited(path: Path, location: Point) {
    const key = pointToCacheKey(location);

    return !!path.visited[key];
  },

  canVisit(path: Path, location: Point) {
    return !Path.hasVisited(path, location);
  },
};

export class Cave {
  grid: Grid;
  size: { height: number; width: number };
  exit: Point;

  constructor(grid: typeof Cave.prototype.grid) {
    this.grid = grid;
    this.size = Grid.size(grid);
    this.exit = { x: this.size.width - 1, y: this.size.height - 1 };
  }

  pathRisks(): number[] {
    return this.innerPathRisks().sort((a, b) => a - b);
  }

  private innerPathRisks(fromPath: Path = Path.start()): number[] {
    if (Point.equal(fromPath.lastLocation, this.exit)) {
      return [this.risk(fromPath)];
    }

    const possibleLocations = this.nextPoints(fromPath.lastLocation)
      .filter((l) => Path.canVisit(fromPath, l));

    return possibleLocations.flatMap((l) =>
      this.innerPathRisks(Path.visit(fromPath, l))
    );
  }

  paths(fromPath: Path = Path.start()): Path[] {
    if (Point.equal(fromPath.lastLocation, this.exit)) {
      return [fromPath];
    }

    const possibleLocations = this.nextPoints(fromPath.lastLocation)
      .filter((l) => Path.canVisit(fromPath, l));

    return possibleLocations.flatMap((l) =>
      this.paths(Path.visit(fromPath, l))
    );
  }

  risk(path: Path): number {
    let out = 0;

    for (const key in path.visited) {
      if (key !== "0,0") {
        out += this.valueAt(cacheKeyToPoint(key));
      }
    }

    return out;
  }

  valueAt(point: Point): number {
    return Point.value(point, this.grid);
  }

  nextPoints(point: Point): Point[] {
    // full
    // return Point.adjacentPoints(point, this.grid)
    // heuristic
    const considered = [Point.east(point), Point.south(point)];

    return considered.filter((p) => this.validPoint(p));
  }

  validPoint(point: Point) {
    return point.x >= 0 && point.x < this.size.width && point.y >= 0 &&
      point.y < this.size.height;
  }
}

export function parseInput(rawInput: string) {
  return {
    cave: new Cave(
      rawInput.trim().split("\n").map((l) => l.split("").map(parseTen)),
    ),
  };
}
