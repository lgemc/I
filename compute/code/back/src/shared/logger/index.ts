import { Context } from "@i/core/context";

import { LogInput, LogLevel } from "./types";
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

export function logCritical(ctx: Context, event: string, data: any) {
  logger.log(ctx, { level: LogLevel.Critical, event, data });
}
