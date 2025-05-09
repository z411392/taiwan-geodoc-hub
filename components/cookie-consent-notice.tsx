"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { cn } from "@/shadcn"
import { Routes } from "@/lib/constants/routes"
import { Cookies } from "@/lib/constants/cookies"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { redirect } from "next/navigation"

interface CookieConsentNoticeProps {
  className?: string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

const position: "top" | "bottom" = "bottom"
export function CookieConsentNotice({ className }: CookieConsentNoticeProps) {
  const [isVisible, setIsVisible] = useState(false)

  const acceptCookies = () => {
    setCookie(Cookies.TrackingConsent, "accepted")
    setIsVisible(false)
  }
  const declineCookies = () => {
    setCookie(Cookies.TrackingConsent, "declined")
    setIsVisible(false)
  }
  const privacyPolicyLink = Routes.PrivacyPolicy as string
  const viewDetails = () => redirect(privacyPolicyLink)
  const handleClose = () => setIsVisible(false)
  const t = useTranslations("(outer)")
  const message = t.rich("cookie-consent-notice.message", {
    PrivacyPolicy: (text) => (
      <Link href={privacyPolicyLink} className="text-teal-600 hover:underline">
        {text}
      </Link>
    ),
  })
  useEffect(() => {
    const consent = getCookie(Cookies.TrackingConsent)
    if (consent) return
    setIsVisible(true)
  }, [])

  if (!isVisible) return null
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 px-4 py-4 md:px-6 bg-background shadow-lg border-t",
        position === "bottom" ? "bottom-0" : "top-0",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm flex-1 pr-8">{message}</div>
        <div className="flex flex-wrap gap-2 ml-auto">
          <Button variant="default" size="sm" onClick={acceptCookies}>
            {t("cookie-consent-notice.buttons.accept")}
          </Button>
          <Button variant="outline" size="sm" onClick={declineCookies}>
            {t("cookie-consent-notice.buttons.decline")}
          </Button>
          <Button variant="outline" size="sm" onClick={viewDetails}>
            {t("cookie-consent-notice.buttons.view-details")}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 sm:relative sm:right-0 sm:top-0"
          onClick={handleClose}
          aria-label={t("cookie-consent-notice.buttons.close")}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
