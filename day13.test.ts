import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day13.ts";

const exampleInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

Deno.test("part 1, parse input", () => {
  const { dots, foldInstructions } = impl.parseInput(exampleInput);

  const grid = impl.Grid.from(dots);

  assertEquals(foldInstructions, [{ axis: "y", index: 7 }, {
    axis: "x",
    index: 5,
  }]);

  const matrix = impl.Grid.toMatrix(grid);

  assertEquals(
    impl.Matrix.toString(matrix),
    `...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
...........
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........`,
  );
});

Deno.test("part 1, first fold", () => {
  const { dots, foldInstructions } = impl.parseInput(exampleInput);

  const grid = impl.Grid.from(dots);

  const oneFold = impl.Grid.fold(grid, foldInstructions[0]);

  assertEquals(
    impl.Matrix.toString(impl.Grid.toMatrix(oneFold)),
    `#.##..#..#.
#...#......
......#...#
#...#......
.#.#..#.###`,
  );

  const twoFold = impl.Grid.fold(oneFold, foldInstructions[1]);

  assertEquals(
    impl.Matrix.toString(impl.Grid.toMatrix(twoFold)),
    `#####
#...#
#...#
#...#
#####`,
  );

  assertEquals(oneFold.length, 17);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day13.input.txt");
  const { dots, foldInstructions } = impl.parseInput(input);

  const oneFold = impl.Grid.fold(impl.Grid.from(dots), foldInstructions[0]);

  console.log(oneFold.length);
});
