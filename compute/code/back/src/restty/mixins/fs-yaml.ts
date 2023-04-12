import { Context } from "@i/core/context";
import { Result, err } from "neverthrow";
import fs from "../fs";
import yamlLib from "@i/shared/yaml/lib";
import templates from "../templates";

async function parse(
  ctx: Context,
  input: {
    templatePath: string;
    envPath?: string;
  }
): Promise<Result<any, Error>> {
  let envRaw = undefined;
  if (input.envPath) {
    envRaw = await fs.load({ path: input.envPath });
    if (envRaw.isErr()) {
      return err(envRaw.error);
    }
  }

  const env = await yamlLib.parseString({ data: envRaw.value });
  if (env.isErr()) {
    return err(env.error);
  }

  const templateRaw = await fs.load({ path: input.templatePath });
  if (templateRaw.isErr()) {
    return err(templateRaw.error);
  }

  const template = await templates.apply(ctx, {
    template: templateRaw.value as string,
    context: env.value,
  });
  if (template.isErr()) {
    return err(template.error);
  }

  const endpoint = await yamlLib.parseString({ data: template.value });
  if (endpoint.isErr()) {
    return err(endpoint.error);
  }

  return endpoint;
}
