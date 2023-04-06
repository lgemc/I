import { Context } from "@i/core/context";

import { LogInput } from "./types";
import { Broadcast } from "./Broadcast";
import { ConsoleLogger } from "./Console";

const logger = new Broadcast();
logger.addLogger(new ConsoleLogger());
export interface Logger {
  log: (ctx: Context, input: LogInput) => void;
}

export function log(ctx: Context, input: LogInput) {
  logger.log(ctx, input);
}
