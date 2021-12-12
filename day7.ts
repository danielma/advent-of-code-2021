import { parseTen } from "./utils.ts";

export function parseInput(rawInput: string) {
  return rawInput.split(",").map(parseTen);
}

export function getBestColumn(locations: number[], calcFuel = calculateFuelTo) {
  const maxColumn = Math.max(...locations);

  const allFuels = new Array(maxColumn - 1).fill(null).map((_, column) =>
    calcFuel(column, locations)
  );

  const bestFuel = Math.min(...allFuels);
  const bestColumn = allFuels.indexOf(bestFuel);

  return { column: bestColumn, fuel: bestFuel };
}

export function getBestColumnPartTwo(locations: number[]) {
  return getBestColumn(locations, calculateFuelToPart2);
}

function factorial(n: number): number {
  if (n === 0) return 0;
  else {
    return n + factorial(n - 1);
  }
}

export function calculateFuelToPart2(column: number, locations: number[]) {
  return locations.reduce(
    (total, location) => total + factorial(Math.abs(location - column)),
    0,
  );
}

export function calculateFuelTo(column: number, locations: number[]) {
  return locations.reduce(
    (total, location) => total + Math.abs(location - column),
    0,
  );
}
