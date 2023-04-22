import client from "@i/shared/http/client/lib";
import { PerformInput } from "./types";
import { Context } from "@i/core/context";
import { Result } from "neverthrow";

async function perform(
  ctx: Context,
  input: PerformInput
): Promise<Result<any, Error>> {
  return client.fetch(input.url, {
    method: input.method,
    headers: input.headers,
    body: input.body,
  });
}
