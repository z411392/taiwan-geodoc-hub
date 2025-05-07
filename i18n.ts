import { getRequestConfig, type RequestConfig } from "next-intl/server"
import { headers as getHeaders, cookies as getCookies } from "next/headers"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"
import { Cookies } from "@/lib/constants/cookies"

const Locales = ["en", "zh"]

const DefaultLocale = "zh"

const detectLocale = (acceptLanguage: string) => {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": acceptLanguage,
    },
  })
  const languages = negotiator.languages()
  return match(languages, Locales, DefaultLocale)
}

export default getRequestConfig(async ({ locale }) => {
  resolving: if (!locale) {
    const cookies = await getCookies()
    locale = cookies.get(Cookies.Locale.name)?.value
    if (locale && Locales.includes(locale)) break resolving
    const headers = await getHeaders()
    const acceptLanguage = headers.get("accept-language")!
    locale = detectLocale(acceptLanguage)
  }
  return {
    locale,
    messages: (await import(`./public/locales/${locale}.json`)).default,
  } as RequestConfig
})
