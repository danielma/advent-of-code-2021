import { hasProperty } from "./utils.ts";

type Polymer = string[];
type Instructions = Record<string, string>;

export const Polymer = {
  applyInstructions(polymer: Polymer, instructions: Instructions): Polymer {
    return polymer.flatMap((value, index, source) => {
      if (index === (source.length - 1)) return value;

      const pair = `${value}${source[index + 1]}`;

      const insertion = instructions[pair];

      if (insertion) {
        return [value, insertion];
      } else {
        throw new Error(`Expected instruction for pair ${pair}`);
      }
    });
  },
};

export const List = {
  count(list: string[]) {
    const out: Record<string, number> = {};
    return list.reduce((memo, item) => {
      if (!hasProperty(memo, item)) {
        memo[item] = 0;
      }

      memo[item]++;

      return memo;
    }, out);
  },

  sortByMostCommon(list: string[]) {
    const counts = List.count(list);

    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  },
};

export function parseInput(
  input: string,
): { polymer: Polymer; instructions: Instructions } {
  const [rawPolymer, rawInstructions] = input.trim().split("\n\n");
  const polymer = rawPolymer.split("");

  const out: Record<string, string> = {};
  const instructions = rawInstructions.split("\n").map((
    l,
  ) => l.split(" -> "))
    .reduce((memo, [pair, insertion]) => {
      memo[pair] = insertion;
      return memo;
    }, out);

  return { polymer, instructions };
}
