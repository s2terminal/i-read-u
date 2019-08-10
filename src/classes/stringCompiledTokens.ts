import * as marked from "marked";
import { Article } from "./article";
import { Command } from "./command";
import { Section } from "./section";

export type filter = (code: string) => boolean;

export class StringCompiledTokens {
  public static generateFromMarkdownContent(content: string): StringCompiledTokens {
    const compiled = new this();
    const lexer = new marked.Lexer();
    compiled.tokens = lexer.lex(content);
    return compiled;
  }

  public tokens: marked.Token[];

  public constructor() {
    this.tokens = [];
  }

  public toCommandSections(
    filter: filter = (): boolean => {
      return true;
    }
  ): Article {
    const article: Article = new Article();
    let section: Section | null = null;

    this.tokens.forEach((token): void => {
      switch (token.type) {
        case "heading":
          if (section) {
            article.sections.push(section);
          }
          section = new Section(token.text, token.depth);
          break;
        case "code":
          if (!section) {
            section = new Section("", 0);
          }
          token.text.split(/\r\n|\r|\n/).map((command: string): void => {
            if (filter(command) && section instanceof Section) {
              section.push(new Command(command));
            }
          });
          break;
        default:
          break;
      }
    });
    if (section) {
      article.sections.push(section);
    }

    const commandExist = article.sections.some((section): boolean => {
      return section.commands.length > 0;
    });
    if (!commandExist) {
      article.sections = [];
    }

    return article;
  }
}
