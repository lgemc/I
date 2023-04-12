import { Context } from '@i/core/context'
import { Result, ok, err } from 'neverthrow'
import { Connection, r } from 'rethinkdb-ts'
import env from '@i/shared/env/lib'

const conn: Connection | undefined = undefined

async function getConn(ctx: Context): Promise<Result<Connection, Error>> {
    if (conn) {
        return ok(conn)
    }

  const port = env.number('RETHINKDB_PORT')
  if(port.isErr()) {
    return err(port.error)
  }
  try {
    const conn = await r.connect({
        host: env.string('RETHINKDB_HOST'),
        port: port.value as number
    })

    return ok(conn)
  } catch (err) {
    return err(err)
  }
}

const rethinkdbLib = {
  getConn
}

export default rethinkdbLib