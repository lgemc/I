import { generateID } from "../crypto";

const defaultLength = 30;

function generate(input: { prefix: string }): string {
  return generateID({ prefix: input.prefix, length: defaultLength });
}

const idsLib = {
  generate,
};

export default idsLib;
