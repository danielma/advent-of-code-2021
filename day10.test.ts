import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day10.ts";

const exampleInput = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

Deno.test("part 1, test input", () => {
  let syntaxLine = impl.parseInput("{<>()}")[0];

  assertEquals(syntaxLine.incompleteCharacters, []);
  assertEquals(syntaxLine.corruptedCharacters, []);

  syntaxLine = impl.parseInput("{<>()")[0];

  assertEquals(syntaxLine.incompleteCharacters, ["{"]);
  assertEquals(syntaxLine.corruptedCharacters, []);

  syntaxLine = impl.parseInput("{<>]()")[0];

  assertEquals(syntaxLine.incompleteCharacters, []);
  assertEquals(syntaxLine.corruptedCharacters, ["]"]);
});

Deno.test("part 1, example input", () => {
  const syntaxLines = impl.parseInput(exampleInput);

  const corruptedLines = syntaxLines.filter((l) =>
    l.corruptedCharacters.length > 0
  );
  const corruptedCharacters = corruptedLines.flatMap((l) =>
    l.corruptedCharacters
  );

  assertEquals(corruptedCharacters, ["}", ")", "]", ")", ">"]);
  assertEquals(impl.scoreCorruption(corruptedCharacters), 26397);
});

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day10.input.txt");

  const syntaxLines = impl.parseInput(input);
  const corruptedLines = syntaxLines.filter((l) =>
    l.corruptedCharacters.length > 0
  );
  const corruptedCharacters = corruptedLines.flatMap((l) =>
    l.corruptedCharacters
  );

  console.log(impl.scoreCorruption(corruptedCharacters));
});

Deno.test("part 2, example input", () => {
  const syntaxLines = impl.parseInput(exampleInput);

  const incompleteLines = syntaxLines.filter((l) =>
    l.incompleteCharacters.length > 0
  );

  const autoCompletes = incompleteLines.map((l) => impl.autoCompleteFor(l));

  const autoCompleteScores = autoCompletes.map(impl.scoreAutoComplete);

  assertEquals(autoCompleteScores, [288957, 5566, 1480781, 995444, 294]);

  assertEquals(impl.autoCompleteWinner(autoCompleteScores), 288957)
});

Deno.test("part 2, example input", () => {
  const input = Deno.readTextFileSync("./day10.input.txt");

  const syntaxLines = impl.parseInput(input);

  const incompleteLines = syntaxLines.filter((l) =>
    l.incompleteCharacters.length > 0
  );

  const autoCompletes = incompleteLines.map((l) => impl.autoCompleteFor(l));

  const autoCompleteScores = autoCompletes.map(impl.scoreAutoComplete);

  console.log(impl.autoCompleteWinner(autoCompleteScores))
});
