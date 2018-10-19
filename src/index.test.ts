import * as inquirer from "inquirer";
import { generateInquirerChoices } from "./CommandExecutor";
import { CommandSections } from "./commandSections";
import { StringCompiledHTML } from "./stringCompiledHTML";

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
    expect(commands.sections).toEqual({
      "# First Commands": [" ls", " w"],
      "## Second Commands": [" pwd", " id"]
    });
  });
});

describe("CommandExecutor", () => {
  it("generate InquirerChoices", () => {
    expect(generateInquirerChoices(commands)).toEqual([
      new inquirer.Separator("# First Commands"),
      " ls",
      " w",
      new inquirer.Separator("## Second Commands"),
      " pwd",
      " id"
    ]);
  });
});
