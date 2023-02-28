export declare interface LookupOptions {
    server: string
    proxy: string
    timeout: number
}
export type callback = (data: object, error: Error) => void
export declare function lookup(addr: string, options: LookupOptions | callback, c?: callback)
declare const whois: { lookup }

export default whois