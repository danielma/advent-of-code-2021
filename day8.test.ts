import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day8.ts";

const oneLineExample =
  `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const exampleInput = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

Deno.test("part 1, example input", () => {
  const readings = impl.parseInput(exampleInput);

  assertEquals(impl.countEasyNumbers(readings), 26);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day8.input.txt");

  const readings = impl.parseInput(input);

  console.log(impl.countEasyNumbers(readings));
});

Deno.test("part 2, one line example input", () => {
  const readings = impl.parseInput(oneLineExample);

  const { wireMappings, outputValue } = impl.parseReading(readings[0]);

  assertEquals(wireMappings, {
    d: "a",
    e: "b",
    a: "c",
    f: "d",
    g: "e",
    b: "f",
    c: "g",
  });

  assertEquals(outputValue, 5353);
});

Deno.test("part 2, full example input", () => {
  const readings = impl.parseInput(exampleInput);

  const outputs = readings.map((r) => impl.parseReading(r).outputValue);

  assertEquals(outputs, [
    8394,
    9781,
    1197,
    9361,
    4873,
    8418,
    4548,
    1625,
    8717,
    4315,
  ]);
});

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("./day8.input.txt");

  const readings = impl.parseInput(input);

  const outputs = readings.map((r) => impl.parseReading(r).outputValue);

  console.log(outputs.reduce((a, b) => a + b));
});
