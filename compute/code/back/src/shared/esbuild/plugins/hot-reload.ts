import { spawn } from "child_process";

let server;

process.on("SIGINT", function () {
  if (!server) return;

  console.log("Exiting from hot reload plugin 📤.");
  server.kill("SIGINT");
});

let hotReload = ({ scriptPath, reloadMessage }) => ({
  name: "env",
  setup(build) {
    build.onEnd(() => {
      if (server) server.kill("SIGINT");
      console.log(reloadMessage || "Reload performed ✅");
      server = spawn("node", [scriptPath], { stdio: "inherit" });
    });
  },
});

export default hotReload;
