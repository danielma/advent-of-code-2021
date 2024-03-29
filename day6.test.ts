import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day6.ts";

const exampleInput = `3,4,3,1,2`;

function assertStep(sim: impl.FishSimulation, fishCycles: number[]) {
  sim.step();
  // console.log(sim.fish)
  assertEquals(sim.fish.map((x) => x.cycle), fishCycles);
}

Deno.test("parsing inputs", () => {
  const lanternFish = impl.parseFish(exampleInput);
  const sim = new impl.FishSimulation(lanternFish);

  assertEquals(sim.fish.map((f) => f.cycle), [3, 4, 3, 1, 2]);

  assertStep(sim, [2, 3, 2, 0, 1]);
  assertStep(sim, [1, 2, 1, 6, 0, 8]);
});

function sumSim(sim: impl.FishSimulation): number {
  return sum(sim.fish.map(f => f.count))
}

function sum(list: number[]): number {
  return list.reduce((a, b) => a + b);
}

Deno.test("part 1, example input", () => {
  const lanternFish = impl.parseFish(exampleInput);
  const sim = new impl.FishSimulation(lanternFish);

  for (let i = 0; i < 18; i++) {
    sim.step();
  }

  assertEquals(sumSim(sim), 26);

  for (let i = 0; i < 62; i++) {
    sim.step();
  }

  assertEquals(sumSim(sim), 5934);
});

Deno.test("part 1, realInput", () => {
  const input = Deno.readTextFileSync("day6.input.txt");

  const fish = impl.parseFish(input);
  const sim = new impl.FishSimulation(fish);

  for (let i = 0; i < 80; i++) {
    sim.step()
  }

  console.log(sumSim(sim));
});

Deno.test("part 2, example", () => {
  const fish = impl.parseFish(exampleInput);
  const sim = new impl.FishSimulation(fish);

  for (let i = 0; i < 256; i++) {
    sim.step()
  }

  assertEquals(sumSim(sim), 26984457539);
});

Deno.test("part 2, realInput", () => {
  const input = Deno.readTextFileSync("day6.input.txt");

  const fish = impl.parseFish(input);
  const sim = new impl.FishSimulation(fish);

  for (let i = 0; i < 256; i++) {
    sim.step()
  }

  console.log(sumSim(sim));
});
