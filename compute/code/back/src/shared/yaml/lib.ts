import { Result, err, ok } from "neverthrow";
import yaml from "js-yaml";

function parseString<T = any>(input: { data: string }): Result<T, Error> {
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
