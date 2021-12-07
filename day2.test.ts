import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { processInput, SubCommandType, Sub2DLocation, SubLocationWithAim } from "./day2.ts";

Deno.test("parsing inputs", () => {
  const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim();

  const cleanInput = processInput(input);

  assertEquals(SubCommandType.forward, cleanInput[0].type);
  assertEquals(5, cleanInput[0].value);
});

Deno.test("part 1 initial test", () => {
  const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim();

  const cleanInput = processInput(input);

  const subLocation = new Sub2DLocation();

  cleanInput.forEach((i) => subLocation.applyCommand(i));

  assertEquals(subLocation.x * subLocation.y, 150);
});

Deno.test("part 1 real inpu", () => {
  const input = Deno.readTextFileSync("day2.input.txt");

  const cleanInput = processInput(input);

  const subLocation = new Sub2DLocation();

  cleanInput.forEach((i) => subLocation.applyCommand(i));

  console.log(subLocation, subLocation.x * subLocation.y);
});

Deno.test("part 2 initial test", () => {
  const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim();

  const cleanInput = processInput(input);

  const subLocation = new SubLocationWithAim()

  cleanInput.forEach((i) => subLocation.applyCommand(i));

  assertEquals(subLocation.x * subLocation.y, 900);
});

Deno.test("part 2 real input", () => {
  const input = Deno.readTextFileSync("day2.input.txt");

  const cleanInput = processInput(input);

  const subLocation = new SubLocationWithAim();

  cleanInput.forEach((i) => subLocation.applyCommand(i));

  console.log(subLocation, subLocation.x * subLocation.y);
});
