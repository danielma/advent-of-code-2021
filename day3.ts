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

export function mostCommonBit(bitList: string): "0" | "1" {
  const zeroes = bitList.match(/0/g)?.length || 0
  const ones = bitList.length - zeroes

  return ones > zeroes ? "1" : "0"
}

export function leastCommonBit(bitList: string): "0" | "1" {
  const other = mostCommonBit(bitList)

  return other === "1" ? "0" : "1"
}

export function parseBinary(bitList: string) {
  return parseInt(bitList, 2)
}
