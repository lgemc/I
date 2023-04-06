import context from "@i/core/context";
import { buildObject } from "@i/shared/errors/lib";
import { ConsoleLogger } from "@i/shared/logger/Console";
import { LogInput, LogLevel } from "@i/shared/logger/types";

const logger = new ConsoleLogger();

export function log(input: LogInput) {
  logger.log(context.Background(), input);
}

export function logError(event: string, err: Error) {
  log({
    event,
    level: LogLevel.Error,
    data: buildObject(err),
  });
}
