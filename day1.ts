export function processInput(input: string): Array<number> {
  return input.split("\n").map((x) => parseInt(x, 10));
}

export function countIncreases(numbers: Array<number>): number {
  return numbers.reduce((memo, currentNumber, index, source) => {
    const lastNumber = source[index - 1];

    if (lastNumber && lastNumber < currentNumber) {
      return memo + 1;
    } else {
      return memo;
    }
  }, 0);
}
