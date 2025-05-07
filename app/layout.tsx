import "@/app/globals.css"
import { Noto_Sans_TC } from "next/font/google"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { CookieConsentNotice } from "@/components/cookie-consent-notice"
import { Toaster } from "@/components/shadcn/toaster"

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
})

export const generateMetadata = async () => {
  const t = await getTranslations("/")
  return {
    title: {
      default: t("metadata.title.default"),
      template: t("metadata.title.template"),
    },
    description: t("metadata.description"),
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
      <body className={`${notoSansTC.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <CookieConsentNotice />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
