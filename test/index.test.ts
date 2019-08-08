import * as fs from "fs";
import * as inquirer from "inquirer";
import { format, parse } from "path";
import { StringCompiledTokens } from "../src/classes/stringCompiledTokens";

describe("main", () => {
  const content = fs.readFileSync(format(parse("./test/DUMMY.md")), "utf8");
  const tokens = StringCompiledTokens.generateFromMarkdownContent(content);
  it("should read markdown file", () => {
    expect(tokens.tokens).toEqual(expect.arrayContaining([
      { type: "heading", depth: 1, text: "First Commands" },
      {
        type: "code",
        lang: "",
        text: `$ ls\n>w`
      },
      { type: "heading", depth: 2, text: "Second Commands" },
      { type: "paragraph", text: "...and ` # pwd`, `id`." },
      { type: "space" }
    ])
    );
  });

  const commands = tokens.toCommandSections();

  it("should generate commands", () => {
    expect(commands.sections[0].renderHeader()).toEqual("# First Commands");
    expect(commands.sections[0].commands[0].executable()).toEqual("ls");
    expect(commands.sections[0].commands[1].executable()).toEqual("w");
    expect(commands.sections[1].renderHeader()).toEqual("## Second Commands");
  });

  it("generate InquirerChoices", () => {
    expect(commands["generateInquirerChoices"]()).toEqual([
      new inquirer.Separator("# First Commands"),
      " ls",
      " w",
      new inquirer.Separator("## Second Commands")
    ]);
  });
});
