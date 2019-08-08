// eslint-disable-next-line @typescript-eslint/no-var-requires
const commander = require("commander");
import * as ChildProcess from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { Internationalization } from "./classes/internationalization";
import { StringCompiledTokens, filter } from "./classes/stringCompiledTokens";

// interface of command-line arguments
interface Argv {
  file: string;
  filter: filter;
}

function i18n(): (key: string) => string {
  const lang: unknown = process.env.LANG;
  if (typeof lang === "string") {
    return Internationalization.getByEnv(lang);
  } else {
    return Internationalization.getByEnv("");
  }
}

function matchFilter(matcher: string): (command: string) => boolean {
  return (command: string): boolean => {
    return command.indexOf(matcher) > 0;
  };
}

function configureCommander(): Argv {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packagejson: { version: string } = require("../package.json");

  commander.arguments("[filename]");
  commander.option("-m, --match <matcher>", "Specify substrings to filtering commands");
  commander.version(packagejson.version);
  commander.parse(process.argv);

  const file = commander.args[0] ? commander.args[0] : "README.md";
  const filter = commander.match
    ? matchFilter(commander.match)
    : (): boolean => {
        return true;
      };

  return {
    file: file,
    filter: filter
  };
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
  const commands = tokens.toCommandSections(args.filter);

  if (commands.sections.length === 0) {
    console.log(__("commandNotFound"));
    return;
  }

  commands.choiceOne(__("question"), (questionCommand, questionName): void => {
    inquirer.prompt<{ [key: string]: string }>([questionCommand]).then((answerCommands): void => {
      const cmd = ChildProcess.exec(answerCommands[questionName]);
      if (cmd != null) {
        if (cmd.stdout != null) {
          cmd.stdout.pipe(process.stdout);
        }
        if (cmd.stderr != null) {
          cmd.stderr.pipe(process.stderr);
        }
      }
    });
  });
}

main();
