export class Command {
  constructor(private rawString: string) {}

  public render() {
    return ` ${this.executable()}`;
  }

  public executable() {
    return this.rawString.replace(/^[#>\s\$]*/, "");
  }
}
