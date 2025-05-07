import "~/app/globals.css"
import { type ReactNode } from "react"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CookieConsentNotice from "~/components/cookie-consent-notice"
import { Toaster } from "~/components/shadcn/toaster"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import TraceIdProvider from "~/composables/contexts/with-resolve-trace-id"
import { startup } from "@/taiwan-geodoc-hub/utils/lifespan"
import { TraceIdGenerator } from "@/taiwan-geodoc-hub/infrastructure/generators/trace-id-generator"
import { TraceId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

// import { Noto_Sans_TC } from "next/font/google"

// const notoSansTC = Noto_Sans_TC({
//   variable: "--font-noto-sans-tc",
//   subsets: ["latin"],
// })

export const generateMetadata = async () => {
    const _ = await getTranslations(Route.Root)
    return {
        title: {
            default: _("templates.metadata.title.default"),
            template: _("templates.metadata.title.template"),
        },
        description: _("templates.metadata.description"),
    }
}

export default async function WithResolveTraceId({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: {
        locale: string
    }
}) {
    const [container, messages] = await Promise.all([
        startup(false),
        getMessages(),
    ])
    const nextTraceId = container.resolve(TraceIdGenerator)
    const traceId = nextTraceId()
    container.register(TraceId, { useValue: traceId })
    return (
        <html lang={locale}>
            <body
                className={[
                    // notoSansTC.variable,
                    `antialiased`,
                ].join(" ")}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <TraceIdProvider traceId={traceId}>
                        {children}
                        <CookieConsentNotice />
                        <Toaster />
                    </TraceIdProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
