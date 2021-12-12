function parseTen(n: string) {
  return parseInt(n, 10);
}

type LanternFish = { cycle: number; count: number };

const LanternFish = {
  initialAge: 8,

  new(cycle = -1, count = 1) {
    return { cycle: cycle === -1 ? LanternFish.initialAge : cycle, count };
  },

  step(fish: LanternFish): LanternFish[] {
    const nextCycle = fish.cycle - 1;

    if (nextCycle === -1) {
      return [{ ...fish, cycle: 6 }, {
        ...fish,
        cycle: LanternFish.initialAge,
      }];
    } else {
      return [{ ...fish, cycle: nextCycle }];
    }
  },
};

export class FishSimulation {
  fish: LanternFish[];

  constructor(fish: LanternFish[]) {
    this.fish = fish;
  }

  step() {
    const originalFishLength = this.fish.length;
    const newFish = [];

    for (let i = 0; i < originalFishLength; i++) {
      const [fishNextValue, fishBaby] = LanternFish.step(this.fish[i]);

      this.fish[i] = fishNextValue;

      if (fishBaby) newFish.push(fishBaby);
    }

    if (newFish.length > 0) {
      this.fish.push(
        newFish.reduce((m, f) => ({ ...m, count: m.count + f.count })),
      );
    }
  }
}

export function parseFish(rawInput: string) {
  return rawInput.trim().split(",").map(parseTen).map((n) =>
    LanternFish.new(n)
  );
}
