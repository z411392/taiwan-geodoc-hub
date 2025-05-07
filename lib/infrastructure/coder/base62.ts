import baseX from "base-x"

export default class Base62 {
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
}
