import { Command } from "./command";

export class Section {
  public commands: Command[];

  public constructor(private headerRawString: string, private headerLevel: number) {
    this.commands = [];
  }

  public push(command: Command): Section {
    this.commands.push(command);
    return this;
  }

  public renderHeader(): string {
    return `${"#".repeat(this.headerLevel)} ${this.headerRawString}`;
  }
}
