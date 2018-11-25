import { Command } from "./command";

export class Section {
  public commands: Command[];

  constructor(private headerRawString: string, private headerLevel: number) {
    this.commands = [];
  }

  public push(command: Command) {
    this.commands.push(command);
    return this.commands;
  }

  public renderHeader() {
    return `${"#".repeat(this.headerLevel)} ${this.headerRawString}`;
  }
}
