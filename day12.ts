import { hasProperty, isUpcase } from "./utils.ts";

export type Path = {
  locations: string[];
  lastLocation: string;

  visitCounts: Record<string, number>;
  alreadyDidDoubleMinorVisit: boolean;
};

const Path = {
  start(): Path {
    return Path.visit(Path.empty(), "start");
  },

  empty(): Path {
    return {
      locations: [],
      visitCounts: {},
      lastLocation: "",
      alreadyDidDoubleMinorVisit: false,
    };
  },

  from(locations: string[]): Path {
    return locations.reduce(
      (memo, location) => Path.visit(memo, location),
      Path.empty(),
    );
  },

  visit(path: Path, location: string): Path {
    const visitCounts = path.visitCounts[location] || 0;
    const alreadyDidDoubleMinorVisit = (location === location.toLowerCase()) &&
      visitCounts === 1;
    return {
      locations: path.locations.concat([location]),
      visitCounts: { ...path.visitCounts, [location]: visitCounts + 1 },
      lastLocation: location,
      alreadyDidDoubleMinorVisit,
    };
  },

  canVisit(path: Path, location: string) {
    if (location === "start") return false;

    return isUpcase(location) || !path.visitCounts[location];
  },

  canVisitWithOneMinorDouble(path: Path, location: string) {
    switch (location) {
      case "start":
        return false;
      case location.toUpperCase():
        return true;
      default:
        return Path.canVisitMinorLocation(path, location);
    }
  },

  canVisitMinorLocation(path: Path, minorLocation: string) {
    if (hasProperty(path.visitCounts, minorLocation)) {
      return !path.alreadyDidDoubleMinorVisit;
    } else {
      return true;
    }
  },
};

export class Caves {
  static from(connections: string[][]) {
    const out: typeof Caves.prototype.connections = {};

    const biDirectionalConnections = connections.reduce((memo, [from, to]) => {
      if (hasProperty(memo, from)) {
        memo[from].push(to);
      } else {
        memo[from] = [to];
      }

      if (hasProperty(memo, to)) {
        memo[to].push(from);
      } else {
        memo[to] = [from];
      }

      return memo;
    }, out);

    return new Caves(biDirectionalConnections);
  }

  connections: Record<string, string[]>;

  constructor(connections: typeof Caves.prototype.connections) {
    this.connections = connections;
  }

  paths(fromPath: Path = Path.start()): Path[] {
    if (fromPath.lastLocation === "end") return [fromPath];

    const possibleLocations = this.connections[fromPath.lastLocation].filter(
      (l) => Path.canVisit(fromPath, l),
    );

    return possibleLocations.flatMap((l) =>
      this.paths(Path.visit(fromPath, l))
    );
  }

  pathsWithOneMinorDouble(fromPath: Path = Path.start()): Path[] {
    if (fromPath.lastLocation === "end") return [fromPath];

    const possibleLocations = this.connections[fromPath.lastLocation].filter(
      (l) => Path.canVisitWithOneMinorDouble(fromPath, l),
    );

    return possibleLocations.flatMap((l) =>
      this.paths(Path.visit(fromPath, l))
    );
  }
}

export function parseInput(rawInput: string) {
  return rawInput.trim().split("\n").map((l) => l.split("-"));
}
