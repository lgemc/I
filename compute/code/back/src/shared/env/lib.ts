import { Result, ok } from "neverthrow";
import numbers from "../numbers/lib";

function string(
  varName: string,
  defaultValue: string = ""
): string | undefined {
  const value = process.env[varName];
  return value === undefined ? defaultValue : value;
}

function number(varName: string, defaultValue: number = 0): Result<Number, Error> {
  const value = process.env[varName];
  if(!value) return ok(defaultValue)
  
  return numbers.parse(value);
}

const env = {
  string,
  number
};

export default env;
