import rethinkdbLib from "@i/shared/rethinkdb/lib";
import { Result, err, ok } from "neverthrow";
import { EventEmitter } from "stream";
import { Context } from "@i/core/context";
import { r } from "rethinkdb-ts";

const watchedTables = ["messages"];

const db = r.db("atelier");

class DatabaseEmitter extends EventEmitter {
  _db_emitter: EventEmitter;

  constructor() {
    super();
  }

  async init(ctx: Context): Promise<Result<DatabaseEmitter, Error>> {
    if (this._db_emitter) {
      return ok(this);
    }

    const conn = await rethinkdbLib.getConn(ctx);
    if (conn.isErr()) {
      return err(conn.error);
    }

    try {
      for (const table of watchedTables) {
        this._db_emitter = await db.table(table).changes().run(conn.value);

        this._db_emitter.on("data", (data) => {
          this.emit(`/${table}`, data);
        });

        this._db_emitter.on("error", (err) => {
          this.emit("error", err);
        });

        return ok(this);
      }
    } catch (e) {
      return err(e);
    }
  }
}

const databaseEmitter = new DatabaseEmitter();

export default databaseEmitter;
