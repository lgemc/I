import context from "@i/core/context";
import fs$yaml$Http from "./fs-yaml-http";
import assert from "assert";

describe("FsYamlHttp", () => {
  it("should return error if file not found", async () => {
    const result = await fs$yaml$Http.parse(context.Background(), {
      templatePath: "not-found.yaml",
    });

    assert.equal(result.isErr(), true);
  });
});
