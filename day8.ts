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

export function parseInput(rawInput: string) {
  const rows = rawInput.trim().split("\n").map((line) => {
    const [combos, message] = line.split(" | ").map((f) => f.split(" "));
    return { combos, message };
  });

  return rows;
}

export function countEasyNumbers(readings: { message: string[] }[]) {
  const EASY_NUMBER_LENGTHS = [1, 4, 7, 8].map(
    (n) => (NORMAL_MAPPINGS_FLIPPED[n as keyof typeof NORMAL_MAPPINGS_FLIPPED]
      .length)
  );

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
