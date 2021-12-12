import { parseTen } from "./utils.ts";

export function parseInput(rawInput: string) {
  return rawInput.split(",").map(parseTen);
}

type FuelRequired = (distance: number) => number

function getBestColumn(locations: number[], fuelRequired: FuelRequired) {
  const maxColumn = Math.max(...locations);

  const allFuels = new Array(maxColumn - 1).fill(null).map((_, column) =>
    calculateFuelTo(column, locations, fuelRequired)
  );

  const bestFuel = Math.min(...allFuels);
  const bestColumn = allFuels.indexOf(bestFuel);

  return { column: bestColumn, fuel: bestFuel };
}

export function getBestConstantColumn(locations: number[]) {
  return getBestColumn(locations, x => x)
}

export function getBestFactorialColumn(locations: number[]) {
  return getBestColumn(locations, factorial);
}

function factorial(n: number): number {
  if (n === 0) return 0;
  else {
    return n + factorial(n - 1);
  }
}

function calculateFuelTo(column: number, locations: number[], fuelRequired: (n: number) => number) {

  return locations.reduce(
    (total, location) => total + fuelRequired(Math.abs(location - column)),
    0,
  );
}

export function calculateFactorialFuelTo(column: number, locations: number[]) {
  return calculateFuelTo(column, locations, factorial)
}

export function calculateConstantFuelTo(column: number, locations: number[]) {
  return calculateFuelTo(column, locations, (x) => x)
}
