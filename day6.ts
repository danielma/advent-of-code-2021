function parseTen(n: string) {
  return parseInt(n, 10);
}

type LanternFish = number

const LanternFish = {
  initialAge: 8,

  new(cycle = -1) {
    return cycle === -1 ? LanternFish.initialAge : cycle
  },

  step(fish: LanternFish): LanternFish[] {
    const nextCycle = fish - 1;

    if (nextCycle === -1) {
      return [6, LanternFish.new()];
    } else {
      return [nextCycle];
    }
  },
};

export class FishSimulation {
  fish: LanternFish[];

  constructor(fish: LanternFish[]) {
    this.fish = fish;
  }

  step() {
    const originalFishLength = this.fish.length

    for (let i = 0; i < originalFishLength; i++) {
      const [fishNextValue, fishBaby] = LanternFish.step(this.fish[i])

      this.fish[i] = fishNextValue

      if (fishBaby) this.fish.push(fishBaby)
    }
  }
}

export function parseFish(rawInput: string) {
  return rawInput.trim().split(",").map(parseTen).map(LanternFish.new);
}
