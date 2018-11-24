import * as fs from "fs";
import * as marked from "marked";
import { format, parse, ParsedPath } from "path";

export class StringCompiledHTML {
  public static generateFromMarkdownFile(filepath: string): StringCompiledHTML {
    const parsedPath = parse(filepath);
    const file = fs.readFileSync(format(parsedPath), "utf8");
    const html = new this();
    html.string = marked(file);
    return html;
  }

  public string: string;
}
