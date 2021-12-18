import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import * as impl from "./day12.ts";

function assertPaths(paths: impl.Path[], expected: string) {
  const expectedPaths = expected.trim().split("\n").map((l) => l.trim());

  assertEquals(
    paths.map((p) => p.locations.join(",")).sort(),
    expectedPaths,
  );
}

Deno.test("part 1, minimal input", () => {
  const exampleInput = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

  const caves = impl.Caves.from(impl.parseInput(exampleInput));

  const paths = caves.paths();

  assertPaths(
    paths,
    `start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end`,
  );
});

Deno.test("part 1, example 2", () => {
  const exampleInput = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

  const caves = impl.Caves.from(impl.parseInput(exampleInput));
  const paths = caves.paths();

  assertPaths(
    paths,
    `start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end`,
  );
});

Deno.test('part 1, final example', () => {
  const exampleInput = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

  const cave = impl.Caves.from(impl.parseInput(exampleInput))
  const paths = cave.paths()

  assertEquals(paths.length, 226)
})

Deno.test("part 1, real input", () => {
  const input = Deno.readTextFileSync("./day12.input.txt");
  const cave = impl.Caves.from(impl.parseInput(input))

  console.log(cave.paths().length)
});

Deno.test("part 2, minimal input", () => {
  const exampleInput = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

  const caves = impl.Caves.from(impl.parseInput(exampleInput));

  const paths = caves.pathsWithOneMinorDouble();

  console.log(paths)

  assertPaths(
    paths,
    `start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end`,
  );
});

Deno.test("part 2, example 2", () => {
  const exampleInput = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

  const caves = impl.Caves.from(impl.parseInput(exampleInput));
  const paths = caves.paths();

  assertPaths(
    paths,
    `start,HN,dc,HN,end
start,HN,dc,HN,kj,HN,end
start,HN,dc,end
start,HN,dc,kj,HN,end
start,HN,end
start,HN,kj,HN,dc,HN,end
start,HN,kj,HN,dc,end
start,HN,kj,HN,end
start,HN,kj,dc,HN,end
start,HN,kj,dc,end
start,dc,HN,end
start,dc,HN,kj,HN,end
start,dc,end
start,dc,kj,HN,end
start,kj,HN,dc,HN,end
start,kj,HN,dc,end
start,kj,HN,end
start,kj,dc,HN,end
start,kj,dc,end`,
  );
});

Deno.test('part 2, final example', () => {
  const exampleInput = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

  const cave = impl.Caves.from(impl.parseInput(exampleInput))
  const paths = cave.paths()

  assertEquals(paths.length, 226)
})

Deno.test("part 2, real input", () => {
  const input = Deno.readTextFileSync("./day12.input.txt");
  const cave = impl.Caves.from(impl.parseInput(input))

  console.log(cave.paths().length)
});
