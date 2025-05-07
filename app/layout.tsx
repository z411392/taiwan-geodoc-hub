import "~/app/globals.css"
import { type ReactNode } from "react"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CookieConsentNotice from "~/components/cookie-consent-notice"
import { Toaster } from "~/components/shadcn/toaster"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import ContainerProvider from "~/composables/providers/container-provider"
import FirebaseProvider from "~/composables/providers/firebase-provider"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { RequestIdGenerator } from "~/lib/taiwan-geodoc-hub/modules/system-maintaining/domain/ports/request-id-generator"
import { type NonAbstractClass } from "~/lib/taiwan-geodoc-hub/infrastructure/constants/types"

import {
    loggerToken,
    requestIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { createLogger } from "@/taiwan-geodoc-hub/infrastructure/utils/logging"

// import { Noto_Sans_TC } from "next/font/google"

// const notoSansTC = Noto_Sans_TC({
//   variable: "--font-noto-sans-tc",
//   subsets: ["latin"],
// })

export const generateMetadata = async () => {
    const _ = await getTranslations(Pages.Root)
    return {
        title: {
            default: _("metadata.title.default"),
            template: _("metadata.title.template"),
        },
        description: _("metadata.description"),
    }
}

export default async function Root({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: {
        locale: string
    }
}) {
    const [container, messages] = await Promise.all([
        bootstrap(),
        getMessages(),
    ])
    const requestIdGenerator = container.resolve(
        RequestIdGenerator as NonAbstractClass<RequestIdGenerator>,
    )
    const requestId = requestIdGenerator.execute()
    container.register(requestIdToken, { useValue: requestId })
    container.register(loggerToken, {
        useFactory: (container) =>
            createLogger({
                requestId: container.resolve(requestIdToken),
            }),
    })
    return (
        <html lang={locale}>
            <body
                className={[
                    // notoSansTC.variable,
                    `antialiased`,
                ].join(" ")}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <FirebaseProvider>
                        <ContainerProvider requestId={requestId}>
                            {children}
                            <CookieConsentNotice />
                            <Toaster />
                        </ContainerProvider>
                    </FirebaseProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
