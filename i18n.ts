import { getRequestConfig, type RequestConfig } from "next-intl/server"
import { headers as getHeaders, cookies as getCookies } from "next/headers"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"
import { Locale } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"

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
    if (!locale) {
        const cookies = await getCookies()
        locale = cookies.get(Locale.name)?.value
        if (!(locale && Locales.includes(locale))) {
            const headers = await getHeaders()
            const acceptLanguage = headers.get("accept-language")!
            locale = detectLocale(acceptLanguage)
        }
    }

    const messages = {
        "/": {
            enums: {
                exception: (
                    await import(
                        `~/public/locales/enums/exception/${locale}.json`
                    )
                ).default,
                region: (
                    await import(`~/public/locales/enums/region/${locale}.json`)
                ).default,
                "role-type": (
                    await import(
                        `~/public/locales/enums/role-type/${locale}.json`
                    )
                ).default,
                "tenant-status": (
                    await import(
                        `~/public/locales/enums/tenant-status/${locale}.json`
                    )
                ).default,
                topic: (
                    await import(`~/public/locales/enums/topic/${locale}.json`)
                ).default,
                "value-status": (
                    await import(
                        `~/public/locales/enums/value-status/${locale}.json`
                    )
                ).default,
            },
            components: {
                "(public)": {
                    header: (
                        await import(
                            `~/public/locales/components/(public)/header/${locale}.json`
                        )
                    ).default,
                    footer: (
                        await import(
                            `~/public/locales/components/(public)/footer/${locale}.json`
                        )
                    ).default,
                },
                "cookie-consent-notice": (
                    await import(
                        `~/public/locales/components/cookie-consent-notice/${locale}.json`
                    )
                ).default,
            },
            templates: (
                await import(`~/public/locales/templates/${locale}.json`)
            ).default,
        },
        "/auth/sign-in": (
            await import(`~/public/locales/pages/auth/sign-in/${locale}.json`)
        ).default,
        "/terms-of-use": (
            await import(`~/public/locales/pages/terms-of-use/${locale}.json`)
        ).default,
        "/privacy-policy": (
            await import(`~/public/locales/pages/privacy-policy/${locale}.json`)
        ).default,
        "/tenants": (
            await import(`~/public/locales/pages/tenants/${locale}.json`)
        ).default,
        "/tenants/[tenantId]": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/dashboard": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/dashboard/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/members": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/members/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/notifications": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/notifications/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/snapshots": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/snapshots/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/snapshots/[snapshotId]/registrations": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/snapshots/[snapshotId]/registrations/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/transactions": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/transactions/${locale}.json`
            )
        ).default,
        "/tenants/[tenantId]/values": (
            await import(
                `~/public/locales/pages/tenants/[tenantId]/values/${locale}.json`
            )
        ).default,
    }

    return {
        locale,
        messages,
    } as RequestConfig
})
