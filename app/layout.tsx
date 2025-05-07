import "~/app/globals.css"
import { type ReactNode } from "react"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CookieConsentNotice from "~/components/(without-resolve-user)/cookie-consent-notice"
import { Toaster } from "~/components/shadcn/toaster"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import TraceIdProvider from "~/composables/providers/trace-id-provider"
import { startupWithResolveTraceId } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-trace-id"
import { TraceId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
// import { Noto_Sans_TC } from "next/font/google"

// const notoSansTC = Noto_Sans_TC({
//   variable: "--font-noto-sans-tc",
//   subsets: ["latin"],
// })

export const generateMetadata = async () => {
    const t = await getTranslations(Route.Root)
    return {
        title: {
            default: t("metadata.title.default"),
            template: t("metadata.title.template"),
        },
        description: t("metadata.description"),
    }
}

export default async function ({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: {
        locale: string
    }
}) {
    const container = await startupWithResolveTraceId()
    const traceId = container.resolve<string>(TraceId)
    const messages = await getMessages()
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
