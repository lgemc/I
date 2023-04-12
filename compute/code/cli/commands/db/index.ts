import { Command } from "commander";
import scripts from "@i/shared/rethinkdb/scripts";
import context from "@i/core/context";
import { logError } from "@cli/logger";

const setdown = new Command()
  .name("setdown")
  .description("Drop database and tables")
  .action(async () => {
    const res = await scripts.setdown(context.Background());
    if (res.isErr()) {
      logError("db_setdown_failed", res.error);
      return;
    }

    console.log("Database setdown completed 🌚");
  });

const setup = new Command()
  .name("setup")
  .description("Create database and tables")
  .action(async () => {
    const res = await scripts.setup(context.Background());
    if (res.isErr()) {
      logError("db_setup_failed", res.error);
      return;
    }

    console.log("Database setup completed 📥, enjoy 🌞");
  });

const db = new Command()
  .name("db")
  .description("Database commands")
  .addCommand(setup)
  .addCommand(setdown);

export default db;
