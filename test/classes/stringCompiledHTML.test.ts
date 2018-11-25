import { Article } from "../../src/classes/article";
import { StringCompiledHTML } from "../../src/classes/stringCompiledHTML";

describe("StringCompiledHTML", () => {
  let html: StringCompiledHTML;
  let article: Article;

  beforeEach(() => {
    html = new StringCompiledHTML();
  });

  describe("generateFromMarkdownContent()", () => {
    it("should generate HTML", () => {
      const content: string = `# First Commands
\`\`\`
$ ls
>w
\`\`\`

## Second Commands

...and \` # pwd\`, \`id\`.
`;
      html = StringCompiledHTML.generateFromMarkdownContent(content);
      expect(html.string).toEqual(`<h1 id="first-commands">First Commands</h1>
<pre><code>$ ls
&gt;w</code></pre><h2 id="second-commands">Second Commands</h2>
<p>...and <code># pwd</code>, <code>id</code>.</p>
`);
    });
  });

  describe("toCommandSections()", () => {
    it("should extract commands from no header HTML", () => {
      html.string = `<pre><code>$ ls</code></pre>`;
      article = html.toCommandSections();
      expect(article.sections[0].commands[0].executable()).toEqual("ls");
    });

    it("should extract commands from HTML including empty header section", () => {
      html.string = `
        <h1>First Header</h1>
        <h2>Second Header</h2>
        <pre><code>$ ls</code></pre>
        <h1>First Header 2</h1>
        <pre><code>$ ls -la</code></pre>
      `;
      article = html.toCommandSections();
      expect(article.sections[1].commands[0].executable()).toEqual("ls");
      expect(article.sections[2].commands[0].executable()).toEqual("ls -la");
    });
  });
});
