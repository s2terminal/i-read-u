import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { StringCompiledHTML } from "../src/classes/stringCompiledHTML";

const content = fs.readFileSync(format(parse("./test/DUMMY.md")), "utf8");
const html = StringCompiledHTML.generateFromMarkdownContent(content);

describe("StringCompiledHTML", () => {
  it("generate HTML", () => {
    expect(html.string).toEqual(`<h1 id="first-commands">First Commands</h1>
<pre><code>$ ls
&gt;w</code></pre><h2 id="second-commands">Second Commands</h2>
<p>...and <code># pwd</code>, <code>id</code>.</p>
`);
  });
});

const commands = html.toCommandSections();

describe("CommandSections", () => {
  it("generate commands", () => {
    expect(commands.sections[0].renderHeader()).toEqual("# First Commands");
    expect(commands.sections[0].commands[0].executable()).toEqual("ls");
    expect(commands.sections[0].commands[1].executable()).toEqual("w");
    expect(commands.sections[1].renderHeader()).toEqual("## Second Commands");
    expect(commands.sections[1].commands[0].executable()).toEqual("pwd");
    expect(commands.sections[1].commands[1].executable()).toEqual("id");
  });
});

describe("CommandExecutor", () => {
  it("generate InquirerChoices", () => {
    // tslint:disable-next-line:no-string-literal
    expect(commands["generateInquirerChoices"]()).toEqual([
      new inquirer.Separator("# First Commands"),
      " ls",
      " w",
      new inquirer.Separator("## Second Commands"),
      " pwd",
      " id"
    ]);
  });
});
