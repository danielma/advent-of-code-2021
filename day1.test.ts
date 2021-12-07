import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { chunkArray, countIncreases, countRollingIncreases, processInput } from "./day1.ts";

Deno.test("part 1, test 1", () => {
  const input = `
199
200
208
210
200
207
240
269
260
263
`.trim();

  const cleanInput = processInput(input);
  assertEquals(countIncreases(cleanInput), 7);
});

Deno.test("part 1, real run", () => {
  const rawInput = Deno.readTextFileSync("day1.input1.txt");
  const cleanInput = processInput(rawInput);
  console.log(countIncreases(cleanInput));
});

Deno.test("part 2, test 1", () => {
  const input = `
199
200
208
210
200
207
240
269
260
263
`.trim();

  const cleanInput = processInput(input);
  assertEquals(chunkArray(cleanInput, 3).length, 8);
})

Deno.test("part 2, test 2", () => {
  const input = `
199
200
208
210
200
207
240
269
260
263
`.trim();

  const cleanInput = processInput(input);
  assertEquals(countRollingIncreases(cleanInput), 5);
})

Deno.test("part 2, real input", () => {
  const rawInput = Deno.readTextFileSync("day1.input1.txt");
  const cleanInput = processInput(rawInput);
  console.log(countRollingIncreases(cleanInput));
})
