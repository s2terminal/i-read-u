import { Section } from "../../src/classes/section";

describe("Section", () => {
  let section: Section;

  describe("renderHeader()", () => {
    it("should render header", () => {
      section = new Section("first header", 1);
      expect(section.renderHeader()).toEqual("# first header");
    });
  });
});
