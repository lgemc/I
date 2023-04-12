import Koa from "koa";
import koaBody from "koa-body";
import Router from "koa-router";

import { Vars } from "@i/shared/env/Vars";
import env from "@i/shared/env/lib";

import messages from "./messages";
import bot from "@i/bot";
import context from "@i/core/context";
import { logCritical, logInfo } from "@i/shared/logger";
import { buildObject } from "@i/shared/errors/lib";

const app = new Koa();

app.use(koaBody());

const router = new Router();
router.use("/messages", messages.routes(), messages.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
  const b = await bot.init(context.Background());
  if (b.isErr()) {
    logCritical(context.Background(), "bot_init_failed", buildObject(b.error));

    return;
  }

  logInfo(context.Background(), "bot_started", {});
}

main();

app.listen(env.string(Vars.ATELIER_API_PORT), () => {
  console.log("Server started 📥");
});
