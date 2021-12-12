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

  const { column, fuel } = impl.getBestColumn(crabs);

  assertEquals(column, 2);
  assertEquals(fuel, 37);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day7.input.txt");

  const crabs = impl.parseInput(input);

  const { fuel } = impl.getBestColumn(crabs);

  console.log(fuel);
});

Deno.test("part 2, setup", () => {
  const crabs = impl.parseInput(exampleInput);

  assertEquals(impl.calculateFuelToPart2(2, crabs), 206);
  assertEquals(impl.calculateFuelToPart2(5, crabs), 168);
});

Deno.test("part 2, example input", () => {
  const crabs = impl.parseInput(exampleInput);

  const { column, fuel } = impl.getBestColumnPartTwo(crabs);

  assertEquals(column, 5);
  assertEquals(fuel, 168);
});

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("./day7.input.txt");

  const crabs = impl.parseInput(input);

  const { fuel } = impl.getBestColumnPartTwo(crabs);

  console.log(fuel);
});
