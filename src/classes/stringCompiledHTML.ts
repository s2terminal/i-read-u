import * as fs from "fs";
import * as marked from "marked";
import { format, parse, ParsedPath } from "path";

export class StringCompiledHTML {
  public static generateFromMarkdownFile(filepath: string): StringCompiledHTML {
    const p = parse(filepath);
    return new this(p);
  }

  public string: string;

  private constructor(filepath: ParsedPath) {
    const file = fs.readFileSync(format(filepath), "utf8");
    this.string = marked(file);
  }
}
