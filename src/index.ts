// tslint:disable-next-line:no-var-requires
const commander = require("commander");
import * as child_process from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { Internationalization } from "./classes/internationalization";
import { StringCompiledHTML } from "./classes/stringCompiledHTML";

// interface of command-line arguments
interface IArgv {
  file: string;
}

function main(): void {
  const __ = Internationalization.getByEnv(process.env.LANG);

  try {
    const args = configureCommander();
    const content = read(args.file);
    const html = StringCompiledHTML.generateFromMarkdownContent(content);
    const commands = html.toCommandSections();

    commands.choiceOne((questionCommand, questionName) => {
      inquirer.prompt([questionCommand]).then(answerCommands => {
        const cmd = child_process.exec(answerCommands[questionName]);
        cmd.stdout.pipe(process.stdout);
        cmd.stderr.pipe(process.stderr);
      });
    });
  } catch (e) {
    console.log(__("err"));
  }
}

function configureCommander(): IArgv {
  const packagejson: any = require("../package.json");

  commander.option("--file <filename>", "Specify the file name", "README.md");
  commander.version(packagejson.version);
  commander.parse(process.argv);

  return { file: commander.file };
}

function read(filepath: string): string {
  return fs.readFileSync(format(parse(filepath)), "utf8");
}

main();
