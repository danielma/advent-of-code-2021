import { add } from "./utils.ts";

enum Opener {
  Paren = "(",
  Bracket = "[",
  Brace = "{",
  Alligator = "<",
}

const OpenerChars: string[] = Object.keys(Opener).map((k) =>
  Opener[k as keyof typeof Opener]
);

type CloserChar = keyof typeof CorruptionScores;
type OpenerChar = "(" | "[" | "{" | "<";

const OpenerMap = {
  "(": ")" as CloserChar,
  "[": "]" as CloserChar,
  "{": "}" as CloserChar,
  "<": ">" as CloserChar,
};

const CorruptionScores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const AutoCompleteScores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

type SyntaxLine = {
  source: string;
  incompleteCharacters: OpenerChar[];
  corruptedCharacters: CloserChar[];
};

type SyntaxWalker = {
  line: SyntaxLine;
  pointer: number;
  openPairs: Opener[];
};

const SyntaxWalker = {
  from(line: SyntaxLine): SyntaxWalker {
    return { line, openPairs: [], pointer: 0 };
  },

  openPairMatch(walker: SyntaxWalker, char: string) {
    const lastOpen = walker.openPairs[walker.openPairs.length - 1];

    return OpenerMap[lastOpen] === char;
  },
};

const SyntaxLine = {
  parse(raw: string): SyntaxLine {
    return SyntaxLine.walk({
      source: raw,
      incompleteCharacters: [],
      corruptedCharacters: [],
    });
  },

  walk(inLine: SyntaxLine): SyntaxLine {
    const walker = SyntaxLine._walk(SyntaxWalker.from(inLine));
    const { line } = walker;

    if (line.corruptedCharacters.length > 0) {
      return line;
    } else {
      return { ...line, incompleteCharacters: walker.openPairs };
    }
  },

  _walk(walker: SyntaxWalker): SyntaxWalker {
    const { line, pointer } = walker;
    if (pointer === line.source.length) return walker;

    const char = line.source[pointer];

    if (OpenerChars.includes(char)) {
      return SyntaxLine._walk({
        ...walker,
        openPairs: [...walker.openPairs, char as Opener],
        pointer: pointer + 1,
      });
    } else if (SyntaxWalker.openPairMatch(walker, char)) {
      return SyntaxLine._walk({
        ...walker,
        openPairs: walker.openPairs.slice(0, -1),
        pointer: pointer + 1,
      });
    } else {
      return {
        ...walker,
        line: { ...line, corruptedCharacters: [char as CloserChar] },
      };
    }
  },

  prettyPrint(source: string) {
    let indent = 0;
    let out = "";

    source.split("").forEach((char) => {
      if (OpenerChars.includes(char as Opener)) {
        out += " ".repeat(indent * 2);
        out += char;
        indent += 1;
      } else {
        indent -= 1;
        out += " ".repeat(indent * 2);
        out += char;
      }

      out += "\n";
    });

    console.log(source);
    console.log(out);
  },
};

export function parseInput(rawInput: string) {
  return rawInput.trim().split("\n").map(SyntaxLine.parse);
}

export function scoreCorruption(characters: CloserChar[]) {
  return characters.map((c) => CorruptionScores[c]).reduce(add);
}

export function autoCompleteFor(line: SyntaxLine): CloserChar[] {
  return line.incompleteCharacters.reverse().map((c) => OpenerMap[c]);
}

export function scoreAutoComplete(autoComplete: CloserChar[]) {
  let score = 0;

  autoComplete.forEach((char) => {
    score = score * 5;

    score += AutoCompleteScores[char];
  });

  return score;
}

export function autoCompleteWinner(scores: number[]) {
  const sortedScores = [...scores].sort((a, b) => a - b);

  return sortedScores[(sortedScores.length - 1) / 2];
}
