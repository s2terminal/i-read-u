import * as cheerio from "cheerio";
import * as marked from "marked";
import { Command } from "./command";
import { CommandSection } from "./commandSection";
import { CommandSections } from "./commandSections";

export class StringCompiledHTML {
  public static generateFromMarkdownContent(content: string): StringCompiledHTML {
    const html = new this();
    html.string = marked(content);

    return html;
  }

  public string: string;

  public toCommandSections(): CommandSections {
    const $ = cheerio.load(this.string);
    const sections: CommandSections = new CommandSections();

    let section: CommandSection;
    $("*")
      .toArray()
      .map(e => {
        const $e = cheerio(e);
        // push and generate new commandSection
        if ($e.is("h1,h2,h3,h4,h5,h6")) {
          const heading: number = +$e.get(0).tagName.substr(1, 1);
          if (section) {
            sections.sections.push(section);
          }
          section = new CommandSection($e.text(), heading);
        }

        // push commands to commandSection
        if ($e.is("code")) {
          if (!section) {
            section = new CommandSection("", 0);
          }
          $e.text()
            .split(/\r\n|\r|\n/)
            .map(command => {
              section.push(new Command(command));
            });
        }
      });
    sections.sections.push(section);

    return sections;
  }
}
