import Koa, { ParameterizedContext } from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import { Vars } from "@i/shared/env/Vars";
import env from "@i/shared/env/lib";
import lib from "@i/shared/openai/chatgpt/lib";
import http from "@i/shared/http/types";
import { generateID } from "@i/shared/crypto";

const app = new Koa();
app.use(koaBody);
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "Hello momy";
});

const messages = new Router({ prefix: "/messages" });

messages.post("/", async (ctx: ParameterizedContext) => {
  const { content } = ctx.request.body;
  if (!content) {
    ctx.status = http.Status.BadRequest;
    ctx.body = { error: { message: "content is required" } };

    return;
  }

  const result = await lib.sendMessage({ message: content });
  if (result.isErr()) {
    ctx.status = http.Status.InternalServerError;
    ctx.body = { error: { message: "internal server error" } };

    return;
  }

  ctx.status = http.Status.OK;
  ctx.body = { message_id: generateID({ length: 30, prefix: "MSG" }) };
});

messages.get("/", async (ctx: ParameterizedContext) => {
  ctx.status = http.Status.OK;
  ctx.body = { messages: [] };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.string(Vars.ATELIER_API_PORT), () => {
  console.log("Server started 📥");
});
