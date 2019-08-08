// eslint-disable-next-line @typescript-eslint/no-var-requires
const commander = require("commander");
import * as ChildProcess from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { Internationalization } from "./classes/internationalization";
import { StringCompiledTokens } from "./classes/stringCompiledTokens";

// interface of command-line arguments
interface Argv {
  file: string;
}

function i18n(): (key: string) => string {
  const lang: unknown = process.env.LANG;
  if (typeof lang === "string") {
    return Internationalization.getByEnv(lang);
  } else {
    return Internationalization.getByEnv("");
  }
}

function configureCommander(): Argv {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packagejson: { version: string } = require("../package.json");

  commander.arguments("[filename]");
  commander.version(packagejson.version);
  commander.parse(process.argv);

  const file = commander.args[0] ? commander.args[0] : "README.md";

  return { file: file };
}

function read(filepath: string, __: (key: string) => string): string {
  try {
    return fs.readFileSync(format(parse(filepath)), "utf8");
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.indexOf("ENOENT") === 0) {
        console.log(__("FileNotFound"));
      } else {
        throw e;
      }
    } else {
      throw e;
    }
  }

  return "";
}

function main(): void {
  const __ = i18n();

  const args = configureCommander();
  const content = read(args.file, __);
  const tokens = StringCompiledTokens.generateFromMarkdownContent(content);
  const commands = tokens.toCommandSections();

  if (commands.sections.length === 0) {
    return;
  }

  commands.choiceOne(__("question"), (questionCommand, questionName): void => {
    inquirer.prompt([questionCommand]).then((answerCommands): void => {
      const cmd = ChildProcess.exec(answerCommands[questionName]);
      cmd.stdout.pipe(process.stdout);
      cmd.stderr.pipe(process.stderr);
    });
  });
}

main();
