import { Result, err, ok } from "neverthrow";
import { r } from "rethinkdb-ts";

import rethinkdbLib from "@i/shared/rethinkdb/lib";

import { Context } from "../context";
import { CreateInput, Message } from "./types";
import { generateID } from "@i/shared/crypto";
import idsLib from "@i/shared/db/ids";

const table = r.db("atelier").table("messages");

async function list(ctx: Context): Promise<Result<Message[], Error>> {
  const conn = await rethinkdbLib.getConn(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  try {
    const messages = await table.run(conn.value);

    return ok(messages);
  } catch (e) {
    return err(e);
  }
}

async function create(
  ctx: Context,
  message: CreateInput
): Promise<Result<Message, Error>> {
  const conn = await rethinkdbLib.getConn(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  try {
    await table
      .insert({ ...message, message_id: idsLib.generate({ prefix: "MSG" }) })
      .run(conn.value);

    return ok(undefined);
  } catch (err) {
    return err(err);
  }
}

const messagesStore = {
  list,
  create,
};

export default messagesStore;
