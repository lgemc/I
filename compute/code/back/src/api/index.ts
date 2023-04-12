import Koa from "koa";
import koaBody from "koa-body";
import Router from "koa-router";

import { Vars } from "@i/shared/env/Vars";
import env from "@i/shared/env/lib";

import messages from "./messages";

const app = new Koa();

app.use(koaBody());

const router = new Router();
router.use("/messages", messages.routes(), messages.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.string(Vars.ATELIER_API_PORT), () => {
  console.log("Server started 📥");
});
