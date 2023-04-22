import { ParameterizedContext } from "koa";
import Router from "koa-router";
import messagesStore from "@i/core/messages/store";
import http from "@i/shared/http/types";
import { generateID } from "@i/shared/crypto";
import context from "@i/core/context";
import { log, logCritical } from "@i/shared/logger";
import errorsLib from "@i/shared/errors/lib";

const messages = new Router();

messages.post("/", async (ctx: ParameterizedContext) => {
  const { to, from, type, text } = ctx.request.body;
  if (!type) {
    ctx.status = http.Status.BadRequest;
    ctx.body = { error: { message: "type is required, allowed: 'text'" } };

    return;
  }
  if (type !== "text") {
    ctx.status = http.Status.BadRequest;
    ctx.body = {
      error: { message: "type not supported yet, allowed: 'text'" },
    };

    return;
  }

  if (!text) {
    ctx.status = http.Status.BadRequest;
    ctx.body = {
      error: {
        message:
          "text is required, should contain a 'body' param with body text",
      },
    };

    return;
  }

  const result = await messagesStore.create(context.Background(), {
    from,
    to,
    type,
    text,
  });
  if (result.isErr()) {
    logCritical(
      context.Background(),
      "messages.create",
      errorsLib.buildObject(result.error)
    );

    ctx.status = http.Status.InternalServerError;
    ctx.body = { error: { message: "internal server error" } };

    return;
  }

  ctx.status = http.Status.OK;
  ctx.body = result.value;
});

messages.get("/", async (ctx: ParameterizedContext) => {
  ctx.status = http.Status.OK;
  ctx.body = { messages: [] };
});

export default messages;
