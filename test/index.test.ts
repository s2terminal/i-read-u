import * as inquirer from "inquirer";
import { CommandSections } from "../src/classes/commandSections";
import { StringCompiledHTML } from "../src/classes/stringCompiledHTML";

const html = StringCompiledHTML.generateFromMarkdownFile("./test/DUMMY.md");

describe("StringCompiledHTML", () => {
  it("generate HTML", () => {
    expect(html.string).toEqual(`<h1 id="first-commands">First Commands</h1>
<pre><code>$ ls
&gt;w</code></pre><h2 id="second-commands">Second Commands</h2>
<p>...and <code># pwd</code>, <code>id</code>.</p>
`);
  });
});

const commands = CommandSections.generateFromHTML(html);

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
