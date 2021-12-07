import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { countIncreases, processInput } from "./day1.ts";

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

Deno.test("basic test", () => {
  const cleanInput = processInput(input);
  assertEquals(countIncreases(cleanInput), 7);
});

Deno.test("real run", () => {
  const rawInput = Deno.readTextFileSync("day1.input1.txt");
  const cleanInput = processInput(rawInput);
  console.log(countIncreases(cleanInput));
});
