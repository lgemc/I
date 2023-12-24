const Koa = require("koa");
const { koaBody } = require("koa-body");
const Router = require("koa-router");

const messagesLib = require("./messages");

const router = new Router();
console.log("router", router);
router.post("/messages", async (ctx, next) => {
  console.log("ctx", ctx);
  const msg = ctx.request.body;
  console.log("Received message:", msg);
  const response = await messagesLib.createMessage(msg);
  console.log(response);
  ctx.body = "OK";
});

const app = new Koa();

app.use(async (ctx, next) => {
  console.log("1");
  await next();
  console.log("2");
});

app.use(koaBody());

app.use(router.routes());

app.use(router.routes());

app.listen(9000);
