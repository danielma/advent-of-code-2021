import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day7.ts";

const exampleInput = `16,1,2,0,4,2,7,1,2,14`;

Deno.test("part 1, setup", () => {
  const crabs = impl.parseInput(exampleInput);

  assertEquals(impl.calculateFuelTo(1, crabs), 41);
  assertEquals(impl.calculateFuelTo(3, crabs), 39);
  assertEquals(impl.calculateFuelTo(10, crabs), 71);
});

Deno.test("part 1, example input", () => {
  const crabs = impl.parseInput(exampleInput);

  const column = impl.getBestColumn(crabs);
  const fuel = impl.calculateFuelTo(column, crabs);

  assertEquals(column, 2);
  assertEquals(fuel, 37);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day7.input.txt");

  const crabs = impl.parseInput(input);

  const column = impl.getBestColumn(crabs);
  const fuel = impl.calculateFuelTo(column, crabs);

  console.log(fuel);
});

Deno.test("part 2, setup", () => {
  const crabs = impl.parseInput(exampleInput);

  assertEquals(impl.calculateFuelTo(1, crabs), 41);
  assertEquals(impl.calculateFuelTo(3, crabs), 39);
  assertEquals(impl.calculateFuelTo(10, crabs), 71);
});

Deno.test("part 2, example input", () => {
  const crabs = impl.parseInput(exampleInput);

  const column = impl.getBestColumn(crabs);
  const fuel = impl.calculateFuelTo(column, crabs);

  assertEquals(column, 2);
  assertEquals(fuel, 37);
});

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("./day7.input.txt");

  const crabs = impl.parseInput(input);

  const column = impl.getBestColumn(crabs);
  const fuel = impl.calculateFuelTo(column, crabs);

  console.log(fuel);
});
