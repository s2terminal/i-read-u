import * as cheerio from "cheerio";
import * as child_process from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as marked from "marked";
const program = require("commander");

function markdownToHtml(filepath: string): string {
  let html: string;

  const file = fs.readFileSync(filepath, "utf8");
  html = marked(file);

  return html;
}

function htmlToCommands(html: string): { [key: string]: string[] } {
  const $ = cheerio.load(html);

  const commands = {};
  let key;
  $("*")
    .toArray()
    .map(e => {
      const $e = cheerio(e);
      if ($e.is("h1,h2,h3,h4,h5,h6")) {
        const heading: number = +$e.get(0).tagName.substr(1, 1);
        key = `${"#".repeat(heading)} ${$e.text()}`;
      }
      if (key && $e.is("code")) {
        $e.text()
          .split(/\r\n|\r|\n/)
          .map(command => {
            if (!commands[key]) {
              commands[key] = [];
            }
            commands[key].push(command.replace(/^[#>\s\$]*/, " "));
          });
      }
    });

  return commands;
}

function executeCommands(commands: { [key: string]: string[] }) {
  const command = "command";
  const commandChoices = [];

  Object.keys(commands).forEach(sect => {
    commandChoices.push(new inquirer.Separator(sect));
    commands[sect].forEach(cmd => {
      commandChoices.push(cmd);
    });
  });

  const questionCommand = {
    type: "list",
    name: command,
    message: "choice section",
    choices: commandChoices
  };
  inquirer.prompt([questionCommand]).then(answerCommands => {
    const cmd = child_process.exec(answerCommands[command]);
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
  });
}

function main() {
  const packagejson = require("../package.json");

  program.option("--file <filename>", "Specify the file name", "README.md");
  program.version(packagejson.version);

  program.parse(process.argv);
  const html = markdownToHtml(program.file);
  const commands = htmlToCommands(html);
  executeCommands(commands);
}

main();
