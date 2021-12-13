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

const OpenerMap = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

// const CLOSERS = ")]}>".split("");

type SyntaxLine = {
  source: string;
  incomplete: boolean;
  corruptedCharacters: CorruptCharacter[];
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
      incomplete: false,
      corruptedCharacters: [],
    });
  },

  walk(inLine: SyntaxLine): SyntaxLine {
    const walker = SyntaxLine._walk(SyntaxWalker.from(inLine));
    const { line } = walker;

    if (line.corruptedCharacters.length > 0) {
      return line;
    } else if (walker.openPairs.length > 0) {
      return { ...line, incomplete: true };
    } else {
      return line;
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
      return { ...walker, line: { ...line, corruptedCharacters: [char as CorruptCharacter] } };
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

type CorruptCharacter = keyof typeof CorruptionScores

const CorruptionScores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export function scoreCorruption(characters: CorruptCharacter[]) {
  return characters.map((c) => CorruptionScores[c]).reduce(add);
}
