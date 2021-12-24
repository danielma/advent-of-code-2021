import { hasProperty } from "./utils.ts";

type Polymer = [string, null | Polymer][];
type Instructions = Record<string, string>;
type LetterCounts = Record<string, number>;

export const Polymer = {
  applyInstructions(
    polymer: Polymer,
    instructions: Instructions,
    depth = 1,
  ): Polymer {
    if (depth === 0) return polymer;

    return polymer.map(([pair]) => {
      const insertion = instructions[pair];
      const [a, b] = pair.split("");

      return [
        pair,
        Polymer.applyInstructions(
          Polymer.empty(`${a}${insertion}`, `${insertion}${b}`),
          instructions,
          depth - 1,
        ),
      ];
    });
  },

  applyToCounts(
    polymer: Polymer,
    instructions: Instructions,
    depth = 1,
  ): LetterCounts {
    const initialLetters = Polymer.join(polymer).split("");
    const out: LetterCounts = {};

    initialLetters.forEach((l) => {
      if (!hasProperty(out, l)) {
        out[l] = 0;
      }

      out[l]++;
    });

    const starterPairs = polymer.map((p) => p[0]);

    starterPairs.forEach((p) => {
      Polymer.innerApplyToCounts(p, instructions, out, depth);
      console.log('done with 1', { out})
    });

    return out;
  },

  innerApplyToCounts(
    pair: string,
    instructions: Instructions,
    out: LetterCounts,
    depth: number,
  ) {
    const insertion = instructions[pair];

    if (!hasProperty(out, insertion)) {
      out[insertion] = 0;
    }

    out[insertion]++;

    if (depth > 1) {
      const [a, b] = pair;
      Polymer.innerApplyToCounts(`${a}${insertion}`, instructions, out, depth - 1)
      Polymer.innerApplyToCounts(`${insertion}${b}`, instructions, out, depth - 1)
    }
  },

  empty(...pairs: string[]): Polymer {
    return pairs.map((p) => [p, null]);
  },

  join(polymer: Polymer): string {
    return polymer[0][0][0] + Polymer.innerJoin(polymer);
  },

  innerJoin(polymer: Polymer): string {
    return polymer.map(([pair, children]) => {
      if (children) {
        return Polymer.innerJoin(children);
      } else {
        return pair[1];
      }
    }).join("");
  },

  countOccurrences(polymer: Polymer): LetterCounts {
    const out: LetterCounts = {};
    const starterChar = polymer[0][0][0];

    out[starterChar] = 1;

    return Polymer.innerCountOccurrences(polymer, out);
  },

  innerCountOccurrences(
    polymer: Polymer,
    out: LetterCounts,
  ): LetterCounts {
    polymer.forEach(([pair, children]) => {
      if (children) {
        return Polymer.innerCountOccurrences(children, out);
      } else if (!hasProperty(out, pair[1])) {
        out[pair[1]] = 0;
      }

      out[pair[1]]++;
    });

    return out;
  },
};

export const List = {
  sortByMostCommon(counts: LetterCounts): string[] {
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  },

  chunk<T>(list: T[], chunkSize: number) {
    const out = [];

    for (let i = 0; i < (list.length - (chunkSize - 1)); i++) {
      out.push(list.slice(i, i + chunkSize));
    }

    return out;
  },
};

export function parseInput(
  input: string,
): { polymer: Polymer; instructions: Instructions } {
  const [rawPolymer, rawInstructions] = input.trim().split("\n\n");
  const pairs = List.chunk(rawPolymer.split(""), 2).map((c) => c.join(""));
  const polymer = Polymer.empty(...pairs);

  const instructionsOut: Record<string, string> = {};
  const instructions = rawInstructions.split("\n").map((
    l,
  ) => l.split(" -> "))
    .reduce((memo, [pair, insertion]) => {
      memo[pair] = insertion;
      return memo;
    }, instructionsOut);

  return { polymer, instructions };
}
