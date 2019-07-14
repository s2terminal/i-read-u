export class Command {
  public constructor(private readonly rawString: string) {}

  public render(): string {
    return ` ${this.executable()}`;
  }

  public executable(): string {
    return this.rawString.replace(/^[#>\s$]*/, "");
  }
}
