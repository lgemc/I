import { Context } from "@i/core/context";
import { LogInput, Logger } from "./types";

export class Broadcast {
  loggers: Logger[];
  constructor() {
    this.loggers = [];
  }

  addLogger(l: Logger) {
    this.loggers.push(l);
  }

  log(ctx: Context, input: LogInput) {
    for (const l of this.loggers) {
      l.log(ctx, input);
    }
  }
}
