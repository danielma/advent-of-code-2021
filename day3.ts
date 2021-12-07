function transpose<T>(input: T[][]): T[][] {
  const out: T[][] = input[0].map(() => []);

  return input.reduce((memo, row) => {
    row.forEach((value, index) => memo[index].push(value));

    return memo;
  }, out);
}

export function processInput(lines: string) {
  const bitLists = lines.trim().split("\n").map((x) => x.split(""));

  return transpose(bitLists).map((x) => x.join(""));
}

export function mostCommonBit(
  bitList: string,
  fallback: "0" | "1" | undefined = undefined,
): "0" | "1" {
  const zeroes = bitList.match(/0/g)?.length || 0;
  const ones = bitList.length - zeroes;

  if (ones === zeroes) {
    if (fallback) return fallback;
    else {
      throw new Error("even number, but no fallback provided!");
    }
  } else {
    return ones > zeroes ? "1" : "0";
  }
}

function flipBit(bit: "0" | "1") { return bit === "0" ? "1" : "0" }

export function leastCommonBit(
  bitList: string,
  fallback: "0" | "1" | undefined = undefined,
): "0" | "1" {
  const other = mostCommonBit(bitList, fallback && flipBit(fallback));

  return flipBit(other);
}

export function parseBinary(bitList: string) {
  return parseInt(bitList, 2);
}

function _oxyGeneratorRating(input: string[], digit = 0): string {
  const importantBits = input.map((l) => l[digit]);
  const mostCommon = mostCommonBit(importantBits.join(""), "1");
  const usable = input.filter((n) => n[digit] === mostCommon);
  // console.log("_oxyGeneratorRating", { input, digit, importantBits, mostCommon, usable });

  if (usable.length === 1) {
    return usable[0];
  } else if (usable.length === 0) {
    throw new Error("wat");
  } else {
    return _oxyGeneratorRating(usable, digit + 1);
  }
}

export function oxyGeneratorRating(input: string) {
  return _oxyGeneratorRating(input.trim().split("\n"));
}

function _co2scrubberRating(input: string[], digit = 0): string {
  const importantBits = input.map((l) => l[digit]);
  const leastCommon = leastCommonBit(importantBits.join(""), "0");
  const usable = input.filter((n) => n[digit] === leastCommon);
  // console.log("_co2scrubberRating", { input, digit, importantBits, leastCommon, usable });

  if (usable.length === 1) {
    return usable[0];
  } else if (usable.length === 0) {
    throw new Error("wat");
  } else {
    return _co2scrubberRating(usable, digit + 1);
  }
}

export function co2scrubberRating(input: string) {
  return _co2scrubberRating(input.trim().split("\n"));
}
