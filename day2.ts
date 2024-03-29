type SubCommandString = string;

export enum SubCommandType {
  forward,
  down,
  up,
}

class SubCommand {
  raw: SubCommandString;
  type: SubCommandType;
  value: number;

  static parseCommandType(raw: SubCommandString) {
    const [command] = raw.split(" ");

    switch (command) {
      case "forward":
        return SubCommandType.forward;
      case "down":
        return SubCommandType.down;
      case "up":
        return SubCommandType.up;
      default:
        throw new Error(`Unknown command type ${command}`);
    }
  }

  static parseCommandValue(raw: SubCommandString) {
    const [_command, value] = raw.split(" ");

    return parseInt(value, 10);
  }

  constructor(raw: SubCommandString) {
    this.raw = raw;
    this.type = SubCommand.parseCommandType(raw);
    this.value = SubCommand.parseCommandValue(raw);
  }
}

export class Sub2DLocation {
  x = 0;
  y = 0;

  applyCommand(command: SubCommand) {
    switch (command.type) {
      case SubCommandType.up:
        this.y -= command.value;
        break;
      case SubCommandType.down:
        this.y += command.value;
        break;
      case SubCommandType.forward:
        this.x += command.value;
        break;
    }
  }
}

export class SubLocationWithAim {
  x = 0;
  y = 0;
  aim = 0;

  applyCommand(command: SubCommand) {
    switch (command.type) {
      case SubCommandType.up:
        this.aim -= command.value;
        break;
      case SubCommandType.down:
        this.aim += command.value;
        break;
      case SubCommandType.forward:
        this.x += command.value;
        this.y += this.aim * command.value;
        break;
    }
  }
}

export function processInput(input: string) {
  return input.trim().split("\n").map((r) => new SubCommand(r));
}
