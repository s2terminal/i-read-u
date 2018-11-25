import { Article } from "../src/classes/article";
import { StringCompiledHTML } from "../src/classes/stringCompiledHTML";

const html = new StringCompiledHTML();

describe("CommandSections", () => {
  describe("generateFromHTML()", () => {
    it("should extract commands from no header HTML", () => {
      html.string = `<pre><code>$ ls</code></pre>`;
      const commands = html.toCommandSections();
      expect(commands.sections[0].commands[0].executable()).toEqual("ls");
    });

    it("should extract commands from HTML including empty header section", () => {
      html.string = `
        <h1>First Header</h1>
        <pre><code>$ ls</code></pre>
        <h2>Second Header</h2>
        <h1>First Header 2</h1>
        <pre><code>$ ls</code></pre>
      `;
      const commands = html.toCommandSections();
      expect(commands.sections[0].commands[0].executable()).toEqual("ls");
    });
  });
});
