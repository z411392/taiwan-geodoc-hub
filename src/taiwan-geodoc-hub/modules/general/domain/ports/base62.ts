export abstract class Base62 {
    abstract encode(bytes: Uint8Array): string
    abstract decode(encoded: string): Uint8Array
}
