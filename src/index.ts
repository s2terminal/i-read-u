import * as child_process from "child_process";
import * as inquirer from "inquirer";
import * as marked from "marked";
import * as cheerio from "cheerio";
import * as fs from "fs";

let filePath = "README.md";

fs.readFile(filePath, "utf8", (err, file) => {
  if (err) {
    console.error(err);
  }
  const html = marked(file);

  let $ = cheerio.load(html);

  let commands = {};
  let key;
  $('*').toArray().map((e)=> {
    let $e = cheerio(e);
    if ($e.is('h1,h2,h3,h4,h5,h6')) {
      key = $e.text();
    }
    if (key && $e.is('code')) {
      $e.text().split(/\r\n|\r|\n/).map((command)=> {
        if (!commands[key]) { commands[key] = [] }
        commands[key].push(command.replace(/^[#>\s\$]+/,''));
      });
    }
  });

  let question = {
    "type": "list",
    "name": "section",
    "message": "choice section",
    "choices": Object.keys(commands),
  }

  inquirer.prompt([question]).then((answer) => {
    let question = {
      "type": "list",
      "name": "command",
      "message": "choice command",
      "choices": commands[answer["section"]],
    }
    inquirer.prompt([question]).then((answer) => {
      child_process.exec(answer["command"], function (err, stdout, stderr) {
        console.log(stdout);
      });
    })
  });
});
