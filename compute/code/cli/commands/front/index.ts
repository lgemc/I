import { Command } from "commander";
import { createServer } from "vite";
import options from "@ops/front";

const serve = new Command().name("serve").action(async () => {
  const server = await createServer(options);

  await server.listen();
  server.printUrls();
});

const front = new Command().name("front").addCommand(serve);

export default front;
