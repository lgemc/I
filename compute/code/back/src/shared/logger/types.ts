import { Context } from "@i/core/context";

export enum LogLevel {
  Warning = "warning",
  Error = "error",
  Info = "info",
  Critical = "critical",
}

export interface LogInput {
  event: string;
  data: any;
  level: LogLevel;
  time?: Date;
}

export interface Logger {
  log: (ctx: Context, input: LogInput) => void;
}
