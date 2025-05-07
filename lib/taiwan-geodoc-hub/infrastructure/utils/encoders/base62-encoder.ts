import baseX from "base-x"

export class Base62Encoder {
    protected base62: ReturnType<typeof baseX>
    constructor(
        characterSet: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ) {
        this.base62 = baseX(characterSet)
    }

    public encode(str: string) {
        return this.base62.encode(Buffer.from(str, "utf-8"))
    }

    public decode(str: string) {
        const decodedBuffer = this.base62.decode(str)
        return Buffer.from(decodedBuffer).toString("utf-8")
    }

    protected convertBigIntToBuffer(num: bigint): Buffer {
        if (num === BigInt(0)) return Buffer.from([0])
        const bytes: number[] = []
        let temp = num
        while (temp > BigInt(0)) {
            bytes.unshift(Number(temp & BigInt(0xff)))
            temp = temp >> BigInt(8)
        }
        return Buffer.from(bytes)
    }

    public encodeBigInt(num: bigint): string {
        const buffer = this.convertBigIntToBuffer(num)
        return this.base62.encode(buffer)
    }

    public encodeUUID(uuid: string): string {
        return this.encodeBigInt(BigInt("0x" + uuid.replace(/-/g, "")))
    }
}
