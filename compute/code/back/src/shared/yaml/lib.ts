import { Result, err, ok } from "neverthrow";
import yaml from "js-yaml";

function parseString(input: { data: string }): Result<string, Error> {
  try {
    const data = yaml.load(input.data);

    return ok(data);
  } catch (e) {
    return err(e);
  }
}

const yamlLib = {
  parseString,
};

export default yamlLib;
