import * as inquirer from "inquirer";
import { Article } from "../../src/classes/article";
import { Command } from "../../src/classes/command";
import { Section } from "../../src/classes/section";

describe("Article", () => {
  let article: Article;

  beforeEach(() => {
    article = new Article();
    article.sections = [
      new Section("First Header", 1).push(new Command("ls -la")),
      new Section("Second Header", 2).push(new Command("w"))
    ];
  });

  describe("generateInquirerChoices()", () => {
    it("should return InquirerChoices", () => {
      // tslint:disable-next-line:no-string-literal
      expect(article["generateInquirerChoices"]()).toEqual([
        new inquirer.Separator("# First Header"),
        " ls -la",
        new inquirer.Separator("## Second Header"),
        " w"
      ]);
    });
  });

  describe("choiceOne()", () => {
    const mock = jest.fn();
    it("should execute prompt", () => {
      article.choiceOne(mock);
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
