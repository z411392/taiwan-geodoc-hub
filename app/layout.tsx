import "@/app/globals.css"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { CookieConsentNotice } from "@/components/cookie-consent-notice"
import { Toaster } from "@/components/shadcn/toaster"
import { Routes } from "@/lib/constants/routes"
// import { Noto_Sans_TC } from "next/font/google"

// const notoSansTC = Noto_Sans_TC({
//   variable: "--font-noto-sans-tc",
//   subsets: ["latin"],
// })

export const generateMetadata = async () => {
  const _ = await getTranslations(Routes.Root)
  return {
    title: {
      default: _("metadata.title.default"),
      template: _("metadata.title.template"),
    },
    description: _("metadata.description"),
    icons: {
      icon: "/favicon.svg",
    },
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: {
    locale: string
  }
}>) {
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
          {children}
          <CookieConsentNotice />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
