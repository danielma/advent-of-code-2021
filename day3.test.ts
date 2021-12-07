import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day3.ts";

const exampleInput = `
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
`.trim();

Deno.test("parsing inputs", () => {
  const cleanInput = impl.processInput(exampleInput);

  assertEquals(cleanInput, [
    "011110011100",
    "010001010101",
    "111111110000",
    "011101100011",
    "000111100100",
  ]);
});

Deno.test("mostCommonBit", () => {
  assertEquals(impl.mostCommonBit("101"), "1");
  assertEquals(impl.mostCommonBit("011"), "1");
  assertEquals(impl.mostCommonBit("000"), "0");
});

Deno.test("part 1, example test", () => {
  const cleanInput = impl.processInput(exampleInput);
  const mostCommonBits = cleanInput.map((r) => impl.mostCommonBit(r)).join("");
  const leastCommonBits = cleanInput.map((r) => impl.leastCommonBit(r)).join(
    "",
  );

  assertEquals(
    impl.parseBinary(mostCommonBits) * impl.parseBinary(leastCommonBits),
    198,
  );
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("day3.input.txt");
  const cleanInput = impl.processInput(input);
  const mostCommonBits = cleanInput.map((r) => impl.mostCommonBit(r)).join("");
  const leastCommonBits = cleanInput.map((r) => impl.leastCommonBit(r)).join(
    "",
  );

  console.log(
    impl.parseBinary(mostCommonBits) * impl.parseBinary(leastCommonBits),
  );
});

Deno.test("part 2, oxygen rating", () => {
  const rating = impl.oxyGeneratorRating(exampleInput);

  assertEquals(impl.parseBinary(rating), 23);
});

Deno.test("part 2, co2 scrubber rating", () => {
  const rating = impl.co2scrubberRating(exampleInput);

  assertEquals(impl.parseBinary(rating), 10);
});

Deno.test("part 2, multiply them", () => {
  const oxyRating = impl.oxyGeneratorRating(exampleInput);
  const co2Rating = impl.co2scrubberRating(exampleInput);

  assertEquals(impl.parseBinary(oxyRating) * impl.parseBinary(co2Rating), 230);
});

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("day3.input.txt")
  const oxyRating = impl.oxyGeneratorRating(input);
  const co2Rating = impl.co2scrubberRating(input);

  console.log(impl.parseBinary(oxyRating) * impl.parseBinary(co2Rating));
});
