import assert from "assert";

import templatesLib from "./lib";

describe("Templates lib", () => {
  it("on invalid template, should return error", () => {
    const result = templatesLib.renderString({
      template: "Hello {{ name }!",
      context: {
        name: "John",
      },
    });
    assert.equal(result.isErr(), true);
  });

  it("should parse valid template", () => {
    const result = templatesLib.renderString({
      template: "Hello {{ name }}!",
      context: {
        name: "John",
      },
    });
    assert.equal(result.isErr(), false);
    assert.deepStrictEqual(result.unwrapOr(""), "Hello John!");
  });
});
