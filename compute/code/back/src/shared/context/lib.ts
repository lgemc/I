import { Context, ContextClass } from "./types";

export function Background(): Context {
  return new ContextClass();
}

export function Extend(ctx: Context | undefined) {
  if (ctx === undefined || ctx.GetAll === undefined) {
    return Background();
  }

  const newCtx = Background();
  const vals = ctx.GetAll();
  for (const key of Object.keys(vals)) {
    newCtx.SetValue(key, ctx.Value(key));
  }

  return newCtx;
}

export function WithValue(ctx: Context, key: string, value: string): Context {
  const newCtx = Extend(ctx);

  newCtx.SetValue(key, value);

  return newCtx;
}

export default {
  Background,
  Extend,
  WithValue,
};
