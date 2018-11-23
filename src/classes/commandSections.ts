import * as cheerio from "cheerio";
import * as child_process from "child_process";
import * as inquirer from "inquirer";
import { Command } from "./command";
import { CommandSection } from "./commandSection";
import { StringCompiledHTML } from "./stringCompiledHTML";

export class CommandSections {
  public static generateFromHTML(html: StringCompiledHTML): CommandSections {
    const $ = cheerio.load(html.string);
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

  public sections: CommandSection[];

  private constructor() {
    this.sections = [];
  }

  public executeCommands(): void {
    const questionName = "command";
    const choices: ReadonlyArray<
      inquirer.ChoiceType
    > = this.generateInquirerChoices();

    const questionCommand: inquirer.Question = {
      type: "list",
      name: questionName,
      message: "choice command",
      choices
    };
    inquirer.prompt([questionCommand]).then(answerCommands => {
      const cmd = child_process.exec(answerCommands[questionName]);
      cmd.stdout.pipe(process.stdout);
      cmd.stderr.pipe(process.stderr);
    });
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
