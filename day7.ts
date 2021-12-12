import { parseTen } from "./utils.ts";

export function parseInput(rawInput: string) {
  return rawInput.split(",").map(parseTen);
}

export function getBestColumn(locations: number[]) {
  const maxColumn = Math.max(...locations);

  const allFuels = new Array(maxColumn - 1).fill(null).map((_, column) =>
    calculateFuelTo(column, locations)
  );

  const bestFuel = Math.min(...allFuels);
  const bestColumn = allFuels.indexOf(bestFuel);

  return bestColumn;
}

export function getBestColumnPartTwo(locations: number[]) {
  return getBestColumn(locations);
}

export function calculateFuelTo(column: number, locations: number[]) {
  return locations.reduce(
    (total, location) => total + Math.abs(location - column),
    0,
  );
}
