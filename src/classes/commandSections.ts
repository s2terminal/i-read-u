import * as inquirer from "inquirer";
import { CommandSection } from "./commandSection";

export class CommandSections {
  public sections: CommandSection[];

  public constructor() {
    this.sections = [];
  }

  public choiceOne(prompt: (question: inquirer.Question, name: string) => void): void {
    const questionName = "command";
    const choices: ReadonlyArray<inquirer.ChoiceType> = this.generateInquirerChoices();

    const questionCommand: inquirer.Question = {
      type: "list",
      name: questionName,
      message: "choice command",
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
