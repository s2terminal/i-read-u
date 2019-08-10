import { Article } from "../../src/classes/article";
import { StringCompiledTokens } from "../../src/classes/stringCompiledTokens";

describe("StringCompiledTokens", (): void => {
  let tokens: StringCompiledTokens;
  let article: Article;

  beforeEach((): void => {
    tokens = new StringCompiledTokens();
  });

  describe("generateFromMarkdownContent()", (): void => {
    it("should generate Tokens", (): void => {
      const content = `# First Commands
\`\`\`
$ ls
>w
\`\`\`

## Second Commands

...and \` # pwd\`, \`id\`.
`;
      tokens = StringCompiledTokens.generateFromMarkdownContent(content);
      expect(tokens.tokens).toEqual(
        expect.arrayContaining([
          { type: "heading", depth: 1, text: "First Commands" },
          {
            type: "code",
            lang: "",
            text: `$ ls\n>w`
          },
          { type: "heading", depth: 2, text: "Second Commands" },
          { type: "paragraph", text: "...and ` # pwd`, `id`." }
        ])
      );
    });
  });

  describe("toCommandSections()", (): void => {
    it("should extract commands from no header document", (): void => {
      tokens.tokens = [{ type: "code", text: "$ ls" }];
      article = tokens.toCommandSections();
      expect(article.sections[0].commands[0].executable()).toEqual("ls");
    });

    it("should extract commands from document including empty header section", (): void => {
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

    it("should filter commands with match option", (): void => {
      tokens.tokens = [
        { type: "code", text: "$ pwd" },
        { type: "code", text: "$ ls" },
        { type: "code", text: "$ ls -la" }
      ];
      article = tokens.toCommandSections((command: string): boolean => {
        return command.indexOf("l") > 0;
      });
      expect(article.sections[0].commands[0].executable()).toEqual("ls");
      expect(article.sections[0].commands[1].executable()).toEqual("ls -la");
    });

    it("should extract no commands from document not including any commands", (): void => {
      tokens.tokens = [
        { type: "heading", depth: 1, text: "First Header" },
        { type: "heading", depth: 2, text: "Second Header" },
        { type: "code", text: "$ ls -la" }
      ];
      article = tokens.toCommandSections((command: string): boolean => {
        return command.indexOf("rm") > 0;
      });
      expect(article.sections.length).toEqual(0);
    });
  });
});
