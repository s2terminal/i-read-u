// tslint:disable-next-line:no-var-requires
const commander = require("commander");
import * as child_process from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { StringCompiledHTML } from "./classes/stringCompiledHTML";

// interface of command-line arguments
interface IArgv {
  file: string;
}

function main(): void {
  const args: IArgv = configureCommander();

  const content = fs.readFileSync(format(parse(args.file)), "utf8");
  const html = StringCompiledHTML.generateFromMarkdownContent(content);
  const commands = html.toCommandSections();

  commands.choiceOne((questionCommand, questionName) => {
    inquirer.prompt([questionCommand]).then(answerCommands => {
      const cmd = child_process.exec(answerCommands[questionName]);
      cmd.stdout.pipe(process.stdout);
      cmd.stderr.pipe(process.stderr);
    });
  });
}

function configureCommander(): IArgv {
  const packagejson: any = require("../package.json");

  commander.option("--file <filename>", "Specify the file name", "README.md");
  commander.version(packagejson.version);
  commander.parse(process.argv);

  return { file: commander.file };
}

main();
