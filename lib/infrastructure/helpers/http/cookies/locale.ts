import { type NextResponse } from "next/server"
import { Cookies } from "@/lib/constants/cookies"
import { getLocale } from "next-intl/server"

export const withLocale = async (response: NextResponse) => {
  const locale = await getLocale()
  const { name, maxAge } = Cookies.Locale
  response.cookies.set(name, locale, { maxAge })
  return response
}
