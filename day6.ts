function parseTen(n: string) {
  return parseInt(n, 10);
}

type LanternFish = { cycle: number };

const LanternFish = {
  initialAge: 8,

  new(cycle = -1) {
    return { cycle: cycle === -1 ? LanternFish.initialAge : cycle };
  },

  step(fish: LanternFish): LanternFish[] {
    const nextCycle = fish.cycle - 1;

    if (nextCycle === -1) {
      return [{ cycle: 6 }, LanternFish.new()];
    } else {
      return [{ cycle: nextCycle }];
    }
  },
};

export class FishSimulation {
  fish: LanternFish[];

  constructor(fish: LanternFish[]) {
    this.fish = fish;
  }

  step() {
    this.fish = this.fish.flatMap(LanternFish.step)
  }
}

export function parseFish(rawInput: string) {
  return rawInput.trim().split(",").map(parseTen).map(LanternFish.new);
}
