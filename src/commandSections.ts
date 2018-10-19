import * as cheerio from "cheerio";
import { StringCompiledHTML } from "./stringCompiledHTML";
const NO_KEY = "NO_KEY";
export class CommandSections {
  public static generateFromHTML(html: StringCompiledHTML): CommandSections {
    const $ = cheerio.load(html.string);

    const commands: CommandSections = new CommandSections();
    let key: string = NO_KEY;
    $("*")
      .toArray()
      .map(e => {
        const $e = cheerio(e);
        if ($e.is("h1,h2,h3,h4,h5,h6")) {
          const heading: number = +$e.get(0).tagName.substr(1, 1);
          key = `${"#".repeat(heading)} ${$e.text()}`;
        }
        if (key && $e.is("code")) {
          $e.text()
            .split(/\r\n|\r|\n/)
            .map(command => {
              commands.push(key, command);
            });
        }
      });

    return commands;
  }
  public sections: { [key: string]: string[] };

  private constructor() {
    this.sections = {};
  }

  public push(key: string, command: string): void {
    if (!this.sections[key]) {
      this.sections[key] = [];
    }
    this.sections[key].push(command.replace(/^[#>\s\$]*/, " "));
  }
}
