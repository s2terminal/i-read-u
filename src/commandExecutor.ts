import * as child_process from "child_process";
import * as inquirer from "inquirer";
import { CommandSections } from "./commandSections";

export function executeCommands(commands: CommandSections): void {
  const questionName = "command";
  const choices: ReadonlyArray<inquirer.ChoiceType> = generateInquirerChoices(
    commands
  );

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

export function generateInquirerChoices(
  commands: CommandSections
): ReadonlyArray<inquirer.ChoiceType> {
  const commandChoices: inquirer.ChoiceType[] = [];

  Object.keys(commands.sections).forEach(sect => {
    commandChoices.push(new inquirer.Separator(sect));
    commands.sections[sect].forEach(cmd => {
      commandChoices.push(cmd);
    });
  });

  return commandChoices;
}
