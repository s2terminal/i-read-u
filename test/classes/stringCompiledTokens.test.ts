import { Article } from "../../src/classes/article";
import { StringCompiledTokens } from "../../src/classes/stringCompiledTokens";

describe("StringCompiledTokens", () => {
  let tokens: StringCompiledTokens;
  let article: Article;

  beforeEach(() => {
    tokens = new StringCompiledTokens();
  });

  describe("generateFromMarkdownContent()", () => {
    it("should generate Tokens", () => {
      const content: string = `# First Commands
\`\`\`
$ ls
>w
\`\`\`

## Second Commands

...and \` # pwd\`, \`id\`.
`;
      tokens = StringCompiledTokens.generateFromMarkdownContent(content);
      expect(tokens.tokens).toEqual(expect.arrayContaining([
        { type: "heading", depth: 1, text: "First Commands" },
        {
          type: "code",
          lang: "",
          text: `$ ls\n>w`
        },
        { type: "heading", depth: 2, text: "Second Commands" },
        { type: "paragraph", text: "...and ` # pwd`, `id`." }
      ]));
    });
  });

  describe("toCommandSections()", () => {
    it("should extract commands from no header document", () => {
      tokens.tokens = [{ type: "code", text: "$ ls" }];
      article = tokens.toCommandSections();
      expect(article.sections[0].commands[0].executable()).toEqual("ls");
    });

    it("should extract commands from document including empty header section", () => {
      tokens.tokens = [
        { type: "heading", depth: 1, text: "First Header" },
        { type: "heading", depth: 2, text: "Second Header" },
        { type: "code", text: "$ ls" },
        { type: "heading", depth: 1, text: "First Header" },
        { type: "code", text: "$ ls -la" }
      ];
      article = tokens.toCommandSections();
      expect(article.sections[1].commands[0].executable()).toEqual("ls");
      expect(article.sections[2].commands[0].executable()).toEqual("ls -la");
    });
  });
});
