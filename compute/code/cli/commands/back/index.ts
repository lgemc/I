import { Command } from "commander";
import esbuild from "esbuild";

import buildOptions from "@ops/back";

const build = new Command().name("build").action(async () => {
  const options = buildOptions({ watch: false });

  await esbuild.build(options);

  console.log("Build performed ✅");
  process.exit(0);
});

const serve = new Command().name("serve").action(async () => {
  const ctx = await esbuild.context(buildOptions({ watch: true }));

  ctx.watch();
});

const command = new Command().name("back").addCommand(build).addCommand(serve);

export default command;
