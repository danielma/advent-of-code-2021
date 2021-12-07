import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  leastCommonBit,
  mostCommonBit,
  parseBinary,
  processInput,
} from "./day3.ts";

Deno.test("parsing inputs", () => {
  const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

  const cleanInput = processInput(input);

  assertEquals(cleanInput, [
    "011110011100",
    "010001010101",
    "111111110000",
    "011101100011",
    "000111100100",
  ]);
});

Deno.test("mostCommonBit", () => {
  assertEquals(mostCommonBit("101"), "1");
  assertEquals(mostCommonBit("011"), "1");
  assertEquals(mostCommonBit("000"), "0");
});

Deno.test("part 1, example test", () => {
  const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

  const cleanInput = processInput(input);
  const mostCommonBits = cleanInput.map(mostCommonBit).join("");
  const leastCommonBits = cleanInput.map(leastCommonBit).join("");

  assertEquals(parseBinary(mostCommonBits) * parseBinary(leastCommonBits), 198);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("day3.input.txt");
  const cleanInput = processInput(input);
  const mostCommonBits = cleanInput.map(mostCommonBit).join("");
  const leastCommonBits = cleanInput.map(leastCommonBit).join("");

  console.log(parseBinary(mostCommonBits) * parseBinary(leastCommonBits));
});
