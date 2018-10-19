import { StringCompiledHTML } from "./stringCompiledHTML";

describe('StringCompiledHTML', () => {
  const html = StringCompiledHTML.generateFromMarkdownFile("./test/DUMMY.md");

  it('generate HTML', () => {
    expect(html.string).toEqual(`<h1 id="first-commands">First Commands</h1>
<pre><code>$ ls
&gt;w</code></pre><h2 id="second-commands">Second Commands</h2>
<p>...and <code># pwd</code>, <code>id</code>.</p>
`);
  });
});


