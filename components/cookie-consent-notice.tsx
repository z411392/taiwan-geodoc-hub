"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import { cn } from "~/shadcn"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { TrackingConsent } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { redirect } from "next/navigation"
import CookiesManager from "js-cookie"

const position: "top" | "bottom" = "bottom"

export default function CookieConsentNotice({
    className,
}: {
    className?: string
}) {
    const [isVisible, setIsVisible] = useState(false)
    const expires = Math.floor(TrackingConsent.maxAge / 86400)
    const acceptCookies = () => {
        CookiesManager.set(TrackingConsent.name, "accepted", {
            expires,
        })
        setIsVisible(false)
    }
    const declineCookies = () => {
        CookiesManager.set(TrackingConsent.name, "declined", {
            expires,
        })
        setIsVisible(false)
    }
    const privacyPolicyLink = Route.PrivacyPolicy as string
    const viewDetails = () => redirect(privacyPolicyLink)
    const handleClose = () => setIsVisible(false)
    const _ = useTranslations(Route.Root)
    const message = _.rich("components.cookie-consent-notice.message", {
        PrivacyPolicy: (text) => (
            <Link
                href={privacyPolicyLink}
                className="text-teal-600 hover:underline"
            >
                {text}
            </Link>
        ),
    })
    useEffect(() => {
        const consent = CookiesManager.get(TrackingConsent.name)
        setIsVisible(!consent)
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
                        {_("components.cookie-consent-notice.buttons.accept")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={declineCookies}
                    >
                        {_("components.cookie-consent-notice.buttons.decline")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={viewDetails}>
                        {_(
                            "components.cookie-consent-notice.buttons.view-details",
                        )}
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 sm:relative sm:right-0 sm:top-0"
                    onClick={handleClose}
                    aria-label={_(
                        "components.cookie-consent-notice.buttons.close",
                    )}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
