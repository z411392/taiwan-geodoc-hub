"use client"

import { useState, useEffect } from "react"
import { cn } from "~/shadcn"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { TrackingConsent } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { redirect } from "next/navigation"
import CookiesManager from "js-cookie"
import AcceptButton from "~/components/(without-resolve-user)/cookie-consent-notice/accept-button"
import DeclineButton from "~/components/(without-resolve-user)/cookie-consent-notice/decline-button"
import ViewDetailsButton from "~/components/(without-resolve-user)/cookie-consent-notice/view-details-button"
import CloseButton from "~/components/(without-resolve-user)/cookie-consent-notice/close-button"
import Description from "~/components/(without-resolve-user)/cookie-consent-notice/description"

const position: "top" | "bottom" = "bottom"

const useTrackingConsent = () => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const consent = CookiesManager.get(TrackingConsent.name)
        setIsVisible(!consent)
    }, [])
    const expires = Math.floor(TrackingConsent.maxAge / 86400)
    const onAccepted = () => {
        CookiesManager.set(TrackingConsent.name, "accepted", { expires })
        setIsVisible(false)
    }
    const onDeclined = () => {
        CookiesManager.set(TrackingConsent.name, "declined", { expires })
        setIsVisible(false)
    }
    const handleClose = () => setIsVisible(false)
    const handleViewDetails = () => redirect(String(Route.PrivacyPolicy))
    return {
        isVisible,
        onAccepted,
        onDeclined,
        handleClose,
        handleViewDetails,
    }
}

export default function ({ className }: { className?: string }) {
    const {
        isVisible,
        onAccepted,
        onDeclined,
        handleClose,
        handleViewDetails,
    } = useTrackingConsent()
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
                <div className="text-sm flex-1 pr-8">
                    <Description handleViewDetails={handleViewDetails} />
                </div>
                <div className="flex flex-wrap gap-2 ml-auto">
                    <AcceptButton onAccepted={onAccepted} />
                    <DeclineButton onDeclined={onDeclined} />
                    <ViewDetailsButton handleViewDetails={handleViewDetails} />
                </div>
                <CloseButton handleClose={handleClose} />
            </div>
        </div>
    )
}
