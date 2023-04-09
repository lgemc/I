import { Config } from "tailwindcss";

const config: Config = {
  content: ["front/src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
};

export default config;
