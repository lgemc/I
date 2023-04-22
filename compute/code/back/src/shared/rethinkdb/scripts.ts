import { Context } from "@i/core/context";
import rethinkdbLib from "./lib";
import { Err, Result, err, ok } from "neverthrow";
import { r } from "rethinkdb-ts";
import { logInfo } from "../logger";

const tables = ["messages"];

async function createTable(
  ctx: Context,
  input: { table: string }
): Promise<Result<void, Error>> {
  const conn = await rethinkdbLib.getConn(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  try {
    if (r.db("atelier").tableList().contains(input.table).run(conn.value)) {
      logInfo(ctx, "Table already exists", { table: input.table });
    } else {
      logInfo(ctx, "Creating table", { table: input.table });
      await r.db("atelier").tableCreate(input.table).run(conn.value);
    }
    return ok(undefined);
  } catch (e) {
    return err(e);
  }
}

async function setup(ctx: Context): Promise<Result<void, Error>> {
  const conn = await rethinkdbLib.getConn(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  try {
    const databases = await r.dbList().run(conn.value);
    if (!databases.includes("atelier")) {
      logInfo(ctx, "Creating database", { database: "atelier" });

      await r.dbCreate("atelier").run(conn.value);
    } else {
      logInfo(ctx, "Database already exists", { database: "atelier" });
    }
    for (const table of tables) {
      const result = await createTable(ctx, { table });
      if (result.isErr()) {
        return err(result.error);
      }
    }

    return ok(undefined);
  } catch (e) {
    return err(e);
  }
}

async function setdown(ctx: Context): Promise<Result<void, Error>> {
  const conn = await rethinkdbLib.getConn(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  try {
    await r.dbDrop("atelier").run(conn.value);

    return ok(undefined);
  } catch (e) {
    return err(e);
  }
}

const scripts = {
  setup,
  setdown,
};

export default scripts;
