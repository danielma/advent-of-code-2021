import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day14.ts";

const exampleInput = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

Deno.test("part 1, parse input", () => {
  const { polymer, instructions } = impl.parseInput(exampleInput);

  assertEquals(polymer, "NNCB".split(""));
  assertEquals(instructions.CN, "C");
});

Deno.test("part 1, basic application", () => {
  const { polymer, instructions } = impl.parseInput(exampleInput);
  const oneStep = impl.Polymer.applyInstructions(polymer, instructions);
  assertEquals(oneStep.join(""), "NCNBCHB");

  const twoStep = impl.Polymer.applyInstructions(oneStep, instructions);

  assertEquals(twoStep.join(""), "NBCCNBBBCBHCB");
});

Deno.test("part 1, example input", () => {
  const { polymer, instructions } = impl.parseInput(exampleInput);

  const tenStep = new Array(10).fill(null).reduce(
    (p) => impl.Polymer.applyInstructions(p, instructions),
    polymer,
  );

  assertEquals(tenStep.length, 3073);

  const counts = impl.List.count(tenStep)
  const commonality = impl.List.sortByMostCommon(tenStep)

  assertEquals(commonality[0], 'B')
  assertEquals(counts.B, 1749)
  assertEquals(commonality[commonality.length - 1], 'H')
  assertEquals(counts.H, 161)

  assertEquals(counts.B - counts.H, 1588)
});

Deno.test('part 1, real input', () => {
  const input = Deno.readTextFileSync('./day14.input.txt')
  const { polymer, instructions } = impl.parseInput(input);

  const tenStep = new Array(10).fill(null).reduce(
    (p) => impl.Polymer.applyInstructions(p, instructions),
    polymer,
  );

  const counts = impl.List.count(tenStep)
  const commonality = impl.List.sortByMostCommon(tenStep)

  const mostCommon = commonality[0]
  const leastCommon = commonality[commonality.length - 1]

  console.log(counts[mostCommon] - counts[leastCommon])
})
