import { Context } from "@i/core/context";
import databaseEmitter from "@i/core/db/emmiter";
import { Result, err, ok } from "neverthrow";
import { EventEmitter } from "stream";

class Bot {
  _database_emiter: EventEmitter;

  constructor() {}

  public async init(ctx: Context): Promise<Result<Bot, Error>> {
    const emitter = await databaseEmitter.init(ctx);
    if (emitter.isErr()) {
      return err(emitter.error);
    }

    this._database_emiter = emitter.value;

    this._database_emiter.on("/messages", (data) => {
      console.log(`hi from bot, data: ${data}`);
    });

    return ok(this);
  }
}

const bot = new Bot();

export default bot;
