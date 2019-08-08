import * as inquirer from "inquirer";
import { Section } from "./section";

type choiceType = inquirer.SeparatorOptions | string;

export class Article {
  public sections: Section[];

  public constructor() {
    this.sections = [];
  }

  public choiceOne(message: string, prompt: (question: inquirer.Question, name: string) => void): void {
    const questionName = "command";
    const choices: choiceType[] = this.generateInquirerChoices();

    const questionCommand: inquirer.Question & { choices: choiceType[] } = {
      type: "list",
      name: questionName,
      message,
      choices
    };

    prompt(questionCommand, questionName);
  }

  private generateInquirerChoices(): choiceType[] {
    const commandChoices: choiceType[] = [];

    this.sections.forEach((section): void => {
      commandChoices.push(new inquirer.Separator(section.renderHeader()));
      section.commands.forEach((cmd): void => {
        commandChoices.push(cmd.render());
      });
    });

    return commandChoices;
  }
}
