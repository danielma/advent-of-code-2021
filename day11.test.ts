import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day11.ts";

const exampleInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

const minimalInput = `
11111
19991
19191
19991
11111`;

function assertStep(sim: impl.OctopiSimulator, stringRep: string) {
  sim.step();

  assertEquals(sim.matrix, impl.parseInput(stringRep));
}

Deno.test("part 1, minimal input", () => {
  const octopi = impl.parseInput(minimalInput);
  const sim = new impl.OctopiSimulator(octopi);

  assertStep(
    sim,
    `34543
40004
50005
40004
34543`,
  );

  assertStep(
    sim,
    `45654
51115
61116
51115
45654`,
  );
});

Deno.test("part 1, flashes work correctly", () => {
  const octopi = impl.parseInput(exampleInput);
  const sim = new impl.OctopiSimulator(octopi);

  assertStep(
    sim,
    `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`,
  );

  assertStep(
    sim,
    `8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`,
  );

  assertStep(
    sim,
    `0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000`,
  );

  assertStep(
    sim,
    `2263031977
0923031697
0032221150
0041111163
0076191174
0053411122
0042361120
5532241122
1532247211
1132230211`,
  );

  assertStep(
    sim,
    `4484144000
2044144000
2253333493
1152333274
1187303285
1164633233
1153472231
6643352233
2643358322
2243341322`,
  );

  assertStep(
    sim,
    `5595255111
3155255222
3364444605
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433`,
  );

  assertStep(
    sim,
    `6707366222
4377366333
4475555827
3496655709
3500625609
3509955566
3486694453
8865585555
4865580644
4465574644`,
  );

  assertStep(
    sim,
    `7818477333
5488477444
5697666949
4608766830
4734946730
4740097688
6900007564
0000009666
8000004755
6800007755`,
  );

  assertStep(
    sim,
    `9060000644
7800000976
6900000080
5840000082
5858000093
6962400000
8021250009
2221130009
9111128097
7911119976`,
  );

  assertStep(
    sim,
    `0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000`,
  );
});

Deno.test("part 1, count flashes", () => {
  const octopi = impl.parseInput(exampleInput);
  const sim = new impl.OctopiSimulator(octopi);

  sim.simulate(99);

  assertStep(
    sim,
    `0397666866
0749766918
0053976933
0004297822
0004229892
0053222877
0532222966
9322228966
7922286866
6789998766`,
  );

  assertEquals(sim.totalFlashes, 1656);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day11.input.txt");
  const octopi = impl.parseInput(input);
  const sim = new impl.OctopiSimulator(octopi);

  sim.simulate(100);
  console.log(sim.totalFlashes)
});
