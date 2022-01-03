import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day15.ts";

const exampleInput = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

Deno.test("part 1, parse input", () => {
  const { cave } = impl.parseInput(exampleInput);

  assertEquals(
    cave.grid[1],
    "1381373672".split("").map((n) => parseInt(n, 10)),
  );
});

Deno.test("part 1, example input", () => {
  const { cave } = impl.parseInput(exampleInput);

  const pathRisks = cave.pathRisks();

  assertEquals(pathRisks[0], 40);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day15.input.txt");
  const { cave } = impl.parseInput(input);

  const pathRisks = cave.pathRisks();

  console.log(pathRisks[0]);
});

// Deno.test("part 2, example input", () => {
//   const { polymer, instructions } = impl.parseInput(exampleInput);

//   const counts = impl.Polymer.applyToCounts(polymer, instructions, 24);
//   const commonality = impl.List.sortByMostCommon(counts);

//   const mostCommon = commonality[0];
//   const leastCommon = commonality[commonality.length - 1];

//   assertEquals(counts[mostCommon] - counts[leastCommon], 2188189693529);
// });

// // Deno.test("part 2, real input", () => {
// //   const input = Deno.readTextFileSync("./day14.input.txt");
// //   const { polymer, instructions } = impl.parseInput(input);

// //   const tenStep = new Array(10).fill(null).reduce(
// //     (p) => impl.Polymer.applyInstructions(p, instructions),
// //     polymer,
// //   );

// //   const counts = impl.List.count(tenStep);
// //   const commonality = impl.List.sortByMostCommon(tenStep);

// //   const mostCommon = commonality[0];
// //   const leastCommon = commonality[commonality.length - 1];

// //   console.log(counts[mostCommon] - counts[leastCommon]);
// // });
