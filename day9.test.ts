import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { add } from "./utils.ts";
import * as impl from "./day9.ts";

const exampleInput = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

Deno.test("part 1, example input", () => {
  const readings = impl.parseInput(exampleInput);
  const lowPointScores = impl.getLowPointScores(readings);

  assertEquals(lowPointScores, [2, 1, 6, 6]);
  assertEquals(lowPointScores.reduce(add), 15);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day9.input.txt");

  const readings = impl.parseInput(input);
  const lowPointScores = impl.getLowPointScores(readings);

  console.log(lowPointScores.reduce(add));
});
