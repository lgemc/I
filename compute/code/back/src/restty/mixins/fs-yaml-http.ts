import { Context } from "@i/core/context";
async function parse(
  ctx: Context,
  input: {
    templatePath: string;
    envPath?: string;
  }
): Promise<Result<any, Error>> {