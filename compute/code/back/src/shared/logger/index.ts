import { Context } from "@i/core/context";

import { LogInput } from "./types";

export interface Logger {
  log: (ctx: Context, input: LogInput) => void;
}
