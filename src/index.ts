import * as child_process from "child_process";
import * as inquirer from "inquirer";
const commander = require("commander");
import { CommandSections } from "./commandSections";
import { StringCompiledHTML } from "./stringCompiledHTML";

function executeCommands(commands: CommandSections): void {
  const command = "command";
  const commandChoices = [];

  Object.keys(commands.sections).forEach(sect => {
    commandChoices.push(new inquirer.Separator(sect));
    commands.sections[sect].forEach(cmd => {
      commandChoices.push(cmd);
    });
  });

  const questionCommand: inquirer.Question = {
    type: "list",
    name: command,
    message: "choice command",
    choices: commandChoices
  };
  inquirer.prompt([questionCommand]).then(answerCommands => {
    const cmd = child_process.exec(answerCommands[command]);
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
  });
}

function main(): void {
  const packagejson: any = require("../package.json");

  commander.option("--file <filename>", "Specify the file name", "README.md");
  commander.version(packagejson.version);

  commander.parse(process.argv);
  const html = StringCompiledHTML.generateFromMarkdownFile(commander.file);
  const commands = CommandSections.generateFromHTML(html);
  executeCommands(commands);
}

main();
