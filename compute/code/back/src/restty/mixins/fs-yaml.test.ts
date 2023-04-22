import assert from "assert";
import fs$yaml from "./fs-yaml";
import context from "../../core/context";

describe("Fs to yaml mixin. It reads from local store and apply env to environment", function () {
  it("should parse on valid data", async function () {
    const result = await fs$yaml.parse(context.Background(), {
      templatePath: "./back/src/restty/mixins/stubs/template.yml",
      envPath: "./back/src/restty/mixins/stubs/env.yml",
    });

    assert.equal(result.isErr(), false);
    assert.deepEqual(result.unwrapOr({}), {
      apiVersion: "v1",
      kind: "Endpoint",
      metadata: {
        name: "List messages",
      },
      spec: {
        path: "localhost:9000/messages",
        method: "GET",
      },
    });
  });
});
