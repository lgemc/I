import { Result, err, ok } from "neverthrow";

function parse(value: string): Result<Number, Error> {
  const n = Number(value);
  if(isNaN(n)) {
    return err(new Error(`"${value}" is not a number`))
  }

  return ok(n)
}

const numbers = {
    parse,
};

export default numbers;