import { Command } from "../../src/classes/command";

describe("Command", () => {
  let command: Command;

  describe("executable()", () => {
    it("should render command", () => {
      command = new Command(" $ ls -la");
      expect(command.executable()).toEqual("ls -la");
    });

    it("should render multiline command", () => {
      command = new Command(`$ ls \
-la`);
      expect(command.executable()).toEqual(`ls \
-la`);
    });
  });
});
