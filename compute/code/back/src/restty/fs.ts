import { Result, err, ok } from "neverthrow";
import $fs from "fs";

async function load(input: { path: string }): Promise<Result<String, Error>> {
  try {
    const readable = $fs.readFileSync(input.path, "utf-8");

    return ok(readable);
  } catch (e) {
    return err(e);
  }
}

const fs = {
  load,
};

export default fs;
