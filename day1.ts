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

export function chunkArray<T>(input: T[], chunkSize: number): T[][] {
  const retVal: T[][] = [];
  return input.reduce((memo, _cv, index, source) => {
    const firstValueToRead = source[index + 1 - chunkSize];

    if (firstValueToRead) {
      return [...memo, source.slice(index + 1 - chunkSize, index + 1)];
    } else {
      return memo;
    }
  }, retVal);
}

function sum(...numbers: number[]) {
  return numbers.reduce((memo, num) => memo + num, 0);
}

export function countRollingIncreases(input: number[]): number {
  const rollingReadings = chunkArray(input, 3).map((x) => sum(...x));

  return countIncreases(rollingReadings);
}
