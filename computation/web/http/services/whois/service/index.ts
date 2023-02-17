import { err, Result, ok} from "neverthrow";
import whois from "whois";
import axios from 'axios'

const whoiss = whois as any
export function lookup(url: string): Promise<Result<object, Error>> {
    axios.get('www.google.com')
    const promise = new Promise<Result<object, Error>>((resolve, reject) => {
        whoiss.lookup(url, (data, error) => {
            if(error !== undefined) {
                reject(err(error))

                return
            }

            resolve(ok(data))
        })
    })

    return promise
} 