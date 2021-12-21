import { hasProperty } from "./utils.ts";

type Polymer = string;
type Instructions = Record<string, string>;

export const Polymer = {
  applyInstructions(polymer: Polymer, instructions: Instructions): Polymer {
    let out = polymer;
    for (let index = 0; index < (out.length - 1); index += 2) {
      const char = out[index];

      const pair = `${char}${out[index + 1]}`;
      const insertion = instructions[pair];

      if (insertion) {
        out = out.slice(0, index + 1) + insertion + out.slice(index + 1);
      } else {
        throw new Error(`Expected instruction for pair ${pair}`);
      }
    }

    return out;
  },
};

export const List = {
  count(list: Polymer) {
    const out: Record<string, number> = {};

    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      if (!hasProperty(out, item)) {
        out[item] = 0;
      }

      out[item]++;
    }

    return out;
  },

  sortByMostCommon(list: Polymer) {
    const counts = List.count(list);

    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  },
};

export function parseInput(
  input: string,
): { polymer: Polymer; instructions: Instructions } {
  const [rawPolymer, rawInstructions] = input.trim().split("\n\n");
  const polymer = rawPolymer;

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
