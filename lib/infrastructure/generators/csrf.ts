import { v1, v4, v5 } from "uuid"
import { base62 } from "@/lib/infrastructure/coders/base62"

export const generateCSRFToken = () => {
  const hex = `0x` + v5(v1(), v4()).replace(/-/g, "")
  const bigInt = BigInt(hex)
  return base62.encodeBigInt(bigInt)
}
