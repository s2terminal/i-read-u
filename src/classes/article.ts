import * as inquirer from "inquirer";
import { Section } from "./section";

export class Article {
  public sections: Section[];

  public constructor() {
    this.sections = [];
  }

  public choiceOne(message: string, prompt: (question: inquirer.Question, name: string) => void): void {
    const questionName = "command";
    const choices: ReadonlyArray<inquirer.ChoiceType> = this.generateInquirerChoices();

    const questionCommand: inquirer.Question = {
      type: "list",
      name: questionName,
      message,
      choices
    };

    prompt(questionCommand, questionName);
  }

  private generateInquirerChoices(): ReadonlyArray<inquirer.ChoiceType> {
    const commandChoices: inquirer.ChoiceType[] = [];

    this.sections.forEach(section => {
      commandChoices.push(new inquirer.Separator(section.renderHeader()));
      section.commands.forEach(cmd => {
        commandChoices.push(cmd.render());
      });
    });

    return commandChoices;
  }
}
