import { Context } from "@i/core/context";
import $templates from "@i/shared/templates/lib";
import { Result, err, ok } from "neverthrow";
import yaml from "@i/shared/yaml/lib";

function apply(
  ctx: Context,
  input: {
    template: string;
    context: any;
  }
): Result<string, Error> {
  return $templates.renderString({
    template: input.template,
    context: input.context,
  });
}

function parse(ctx: Context, input: { template: string }): Result<any, Error> {
  try {
    const response = yaml.parseString({ data: input.template });

    return ok(response);
  } catch (e) {
    return err(e);
  }
}

const templates = {
  apply,
  parse,
};

export default templates;
