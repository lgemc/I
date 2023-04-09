import { InlineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

import tsconfigPaths from "vite-tsconfig-paths";
import tailwindConfig from "./tailwind.config";

const options: InlineConfig = {
  root: `./front`,
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig),
        require("postcss-minify"),
        require("autoprefixer"),
      ],
    },
  },
  envPrefix: "VITE_",
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
};

export default options;
