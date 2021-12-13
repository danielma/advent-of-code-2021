import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { add, multiply } from "./utils.ts";
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

Deno.test("part 2, example input", () => {
  const readings = impl.parseInput(exampleInput);
  const basinSizes = impl.getBasins(readings);

  assertEquals(basinSizes, [3, 9, 14, 9]);

  const threeLargestBasins = basinSizes.sort((a,b) => a-b)
  assertEquals(threeLargestBasins.slice(-3).reduce(multiply), 1134)
});

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("./day9.input.txt");
  const readings = impl.parseInput(input);
  const basinSizes = impl.getBasins(readings);

  const threeLargestBasins = basinSizes.sort((a,b) => a-b)
  console.log(threeLargestBasins.slice(-3).reduce(multiply))
});
