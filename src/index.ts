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
  const __ = i18n();

  try {
    const args = configureCommander();
    const content = read(args.file);
    const html = StringCompiledHTML.generateFromMarkdownContent(content);
    const commands = html.toCommandSections();

    commands.choiceOne(__("question"), (questionCommand, questionName) => {
      inquirer.prompt([questionCommand]).then(answerCommands => {
        const cmd = child_process.exec(answerCommands[questionName]);
        cmd.stdout.pipe(process.stdout);
        cmd.stderr.pipe(process.stderr);
      });
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.code === "ENOENT") {
        // tslint:disable-next-line:no-console
        console.log(__("FileNotFound"));
      } else {
        throw e;
      }
    } else {
      throw e;
    }
  }
}

function configureCommander(): IArgv {
  const packagejson: any = require("../package.json");

  commander.option("-f, --file <filename>", "Specify the file name", "README.md");
  commander.version(packagejson.version);
  commander.parse(process.argv);

  return { file: commander.file };
}

function read(filepath: string): string {
  return fs.readFileSync(format(parse(filepath)), "utf8");
}

function i18n() {
  const lang: unknown = process.env.LANG;
  if (typeof lang === "string") {
    return Internationalization.getByEnv(lang);
  } else {
    return Internationalization.getByEnv("");
  }
}

main();
