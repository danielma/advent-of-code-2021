import { parseTen } from "./utils.ts";

/*
    0:      1:      2:      3:      4:
   aaaa    ....    aaaa    aaaa    ....
  b    c  .    c  .    c  .    c  b    c
  b    c  .    c  .    c  .    c  b    c
   ....    ....    dddd    dddd    dddd
  e    f  .    f  e    .  .    f  .    f
  e    f  .    f  e    .  .    f  .    f
   gggg    ....    gggg    gggg    ....

    5:      6:      7:      8:      9:
   aaaa    aaaa    aaaa    aaaa    aaaa
  b    .  b    .  .    c  b    c  b    c
  b    .  b    .  .    c  b    c  b    c
   dddd    dddd    ....    dddd    dddd
  .    f  e    f  .    f  e    f  .    f
  .    f  e    f  .    f  e    f  .    f
   gggg    gggg    ....    gggg    gggg
*/

const NORMAL_MAPPINGS = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

const NORMAL_MAPPINGS_FLIPPED = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdefg",
  7: "acf",
  8: "abcdefg",
  9: "abcdfg",
};

const EASY_NUMBERS = [1, 4, 7, 8];

const EASY_NUMBER_LENGTHS = EASY_NUMBERS.map(
  (n) => (NORMAL_MAPPINGS_FLIPPED[n as keyof typeof NORMAL_MAPPINGS_FLIPPED]
    .length),
);

export function parseInput(rawInput: string) {
  const rows = rawInput.trim().split("\n").map((line) => {
    const [combos, message] = line.split(" | ").map((f) => f.split(" "));
    return { combos: combos.map((c) => c.split("").sort().join("")), message };
  });

  return rows;
}

export function countEasyNumbers(readings: { message: string[] }[]) {
  let easyNumberCount = 0;

  readings.forEach(({ message }) => {
    message.forEach((m) => {
      if (EASY_NUMBER_LENGTHS.indexOf(m.length) > -1) {
        easyNumberCount++;
      }
    });
  });

  return easyNumberCount;
}

function diffChars(superset: string, subset: string) {
  const superChars = superset.split("");

  return superChars.filter((char) => !subset.includes(char)).join("");
}

const LETTERS = "abcdefg".split("");

function lettersInEvery(letterLists: string[]) {
  return LETTERS.filter((l) => letterLists.every((list) => list.includes(l)));
}

function reconstructNumber(wires: string, mapping: { [key: string]: string }) {
  const correctWires = wires.split("").map((w) => mapping[w] as string).sort()
    .join("") as keyof typeof NORMAL_MAPPINGS;

  return NORMAL_MAPPINGS[correctWires];
}

export function parseReading(
  { combos, message }: { combos: string[]; message: string[] },
) {
  // 1 == 2

  // 7 == 3

  // 4 == 4

  // 2 == 5
  // 3 == 5
  // 5 == 5

  // 0 == 6
  // 6 == 6
  // 9 == 6

  // 8 == 7
  const oneWires = combos.find((c) => c.length === 2) as string;
  const fourWires = combos.find((c) => c.length === 4) as string;
  const sevenWires = combos.find((c) => c.length === 3) as string;
  const eightWires = combos.find((c) => c.length === 7) as string;
  const zeroSixNineWires = combos.filter((c) => c.length === 6) as string[];
  const twoThreeFiveWires = combos.filter((c) => c.length === 5) as string[];

  const aWire = diffChars(sevenWires, oneWires);
  const cWire = (function () {
    const [possibleWireA, possibleWireB] = oneWires.split("");

    if (zeroSixNineWires.every((w) => w.includes(possibleWireA))) {
      return possibleWireB;
    } else {
      return possibleWireA;
    }
  })();
  const fWire = diffChars(oneWires, cWire);
  const gWire = (function () {
    const topAndBottomWires = [...zeroSixNineWires, ...twoThreeFiveWires];

    return diffChars(lettersInEvery(topAndBottomWires).join(""), aWire);
  })();
  const dWire = (function () {
    const adgWires = lettersInEvery(twoThreeFiveWires);

    return diffChars(adgWires.join(""), aWire + gWire);
  })();
  const bWire = diffChars(fourWires, dWire + cWire + fWire);
  const eWire = diffChars(
    eightWires,
    aWire + bWire + cWire + dWire + fWire + gWire,
  );

  const wireMappings = {
    [aWire]: "a",
    [bWire]: "b",
    [cWire]: "c",
    [dWire]: "d",
    [eWire]: "e",
    [fWire]: "f",
    [gWire]: "g",
  };

  const outputValue = parseTen(
    message.map((m) => reconstructNumber(m, wireMappings)).join(""),
  );

  return { wireMappings, outputValue };
}
