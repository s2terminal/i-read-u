import * as cheerio from "cheerio";
import * as marked from "marked";
import { Article } from "./article";
import { Command } from "./command";
import { Section } from "./section";

export class StringCompiledHTML {
  public static generateFromMarkdownContent(content: string): StringCompiledHTML {
    const html = new this();
    html.string = marked(content);

    return html;
  }

  public string: string;

  public toCommandSections(): Article {
    const $ = cheerio.load(this.string);
    const article: Article = new Article();

    let section: Section;
    $("*")
      .toArray()
      .map(e => {
        const $e = cheerio(e);
        // push and generate new commandSection
        if ($e.is("h1,h2,h3,h4,h5,h6")) {
          const heading: number = +$e.get(0).tagName.substr(1, 1);
          if (section) {
            article.sections.push(section);
          }
          section = new Section($e.text(), heading);
        }

        // push commands to commandSection
        if ($e.is("code")) {
          if (!section) {
            section = new Section("", 0);
          }
          $e.text()
            .split(/\r\n|\r|\n/)
            .map(command => {
              section.push(new Command(command));
            });
        }
      });
    article.sections.push(section);

    return article;
  }
}
