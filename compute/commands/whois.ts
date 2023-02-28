import { lookup }  from "../web/http/services/whois/service"
import { err, ok, Result } from 'neverthrow'
async function run(): Promise<Result<object, Error>> {
    const result = await lookup(process.argv[0])
    if(result.isErr()) {
        return err(result.error)
    }  

    return ok(result.value)
}

run()

