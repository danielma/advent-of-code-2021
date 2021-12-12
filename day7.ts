import { parseTen } from "./utils.ts";

export function parseInput(rawInput: string) {
  return rawInput.split(",").map(parseTen);
}

type FuelRequired = (distance: number) => number;

function getBestColumn(locations: number[], fuelRequired: FuelRequired) {
  const maxColumn = Math.max(...locations);

  let bestFuel = Infinity;
  let bestColumn = -1;

  for (let i = 0; i < maxColumn; i++) {
    const fuel = calculateFuelTo(i, locations, fuelRequired);

    if (fuel < bestFuel) {
      bestFuel = fuel;
      bestColumn = i;
    }
  }

  return { column: bestColumn, fuel: bestFuel };
}

export function getBestConstantColumn(locations: number[]) {
  return getBestColumn(locations, (x) => x);
}

export function getBestNthTriangleColumn(locations: number[]) {
  return getBestColumn(locations, nthTriangle);
}

// https://math.stackexchange.com/a/593320
function nthTriangle(n: number): number {
  return ((n ** 2) + n) / 2
}

function calculateFuelTo(
  column: number,
  locations: number[],
  fuelRequired: (n: number) => number,
) {
  return locations.reduce(
    (total, location) => total + fuelRequired(Math.abs(location - column)),
    0,
  );
}

export function calculateNthTriangleFuelTo(column: number, locations: number[]) {
  return calculateFuelTo(column, locations, nthTriangle);
}

export function calculateConstantFuelTo(column: number, locations: number[]) {
  return calculateFuelTo(column, locations, (x) => x);
}
