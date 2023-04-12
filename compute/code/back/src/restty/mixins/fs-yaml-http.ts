import { Context } from "@i/core/context";
import { Result, err, ok } from "neverthrow";
import fs$yaml from "./fs-yaml";
import client from "@i/shared/http/client/lib";
import { UserError, UserErrorTypes } from "./errors";

async function parse(
  ctx: Context,
  input: {
    templatePath: string;
    envPath?: string;
  }
): Promise<Result<any, Error>> {
  const request = await fs$yaml.parse(ctx, input);
  if (request.isErr()) {
    return request;
  }

  if (!request.value.spec) {
    return err(new UserError("Missing spec", UserErrorTypes.MissingData));
  }

  if (!request.value.spec.method) {
    return err(new UserError("Missing method", UserErrorTypes.MissingData));
  }
  const response = await client.fetch(request.value.spec.url, {
    headers: request.value.spec.headers,
    method: request.value.spec.method,
    body: request.value.spec.body,
  });
  if (response.isErr()) {
    return err(response.error);
  }

  return ok(response.value);
}

const fs$yaml$http = {
  parse,
};

export default fs$yaml$http;
