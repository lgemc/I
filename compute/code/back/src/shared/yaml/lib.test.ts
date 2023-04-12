import assert from "assert";
import yamlLib from "./lib";

const stub = `
apiVersion: v1
kind: Endpoint
metadata:
    name: List messages
spec:
    path: "{{ host }}:{{ port }}/messages"
    method: GET
`;

describe("Yaml lib", () => {
  it("should parse valid yaml", () => {
    const result = yamlLib.parseString({ data: stub });
    assert.equal(result.isErr(), false);
    assert.deepStrictEqual(result.unwrapOr({}), {
      apiVersion: "v1",
      kind: "Endpoint",
      metadata: {
        name: "List messages",
      },
      spec: {
        path: "{{ host }}:{{ port }}/messages",
        method: "GET",
      },
    });
  });

  it("on invalid yaml, should return error", () => {
    const result = yamlLib.parseString({ data: "{'invalid" });
    assert.equal(result.isErr(), true);
  });
});
