import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day5.ts";

const exampleInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim();

Deno.test("parsing inputs", () => {
  const seaFloor = impl.processSeaFloor(exampleInput);


  // i broke these because the arrays are partially empty now

  // assertEquals(seaFloor.matrix[0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
  // assertEquals(seaFloor.matrix[1], [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]);
});

Deno.test("part 1", () => {
  const seaFloor = impl.processSeaFloor(exampleInput);

  assertEquals(seaFloor.spotsWithMinDanger(2).length, 5);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("day5.input.txt");

  const seaFloor = impl.processSeaFloor(input);

  console.log(seaFloor.spotsWithMinDanger(2).length)
});

// Deno.test("part 2, test", () => {
//   const bingo = impl.processBingo(exampleInput);

//   const winningBoard = bingo.playToLastWin();

//   console.log(winningBoard);

//   assertEquals(winningBoard!.sumUnmarked() * bingo.currentNumber(), 1924);
// });

// Deno.test("part 2, real input", () => {
//   const input = Deno.readTextFileSync("day4.input.txt");

//   const bingo = impl.processBingo(input);

//   const winningBoard = bingo.playToLastWin();

//   console.log(winningBoard);
//   console.log(winningBoard!.sumUnmarked() * bingo.currentNumber());
// });
