import { BuildOptions } from "esbuild";

import hotReload from "@i/shared/esbuild/plugins/hot-reload";

const outDir = "dist/api";

function buildOptions(input: { watch?: boolean }) {
  const plugins = [];

  if (input.watch) {
    plugins.push(
      hotReload({
        scriptPath: `${outDir}/index.js`,
        reloadMessage: "Reload performed ✅",
      })
    );
  }

  const options: BuildOptions = {
    entryPoints: ["back/src/api/index.ts"],
    bundle: true,
    outdir: outDir,
    platform: "node",
    target: "node18",
    format: "cjs",
    minify: true,
    sourcemap: true,
    logLevel: "error",
    plugins,
  };

  return options;
}

export default buildOptions;
