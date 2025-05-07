"use client"

import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"

export default function ({ handleClose }: { handleClose: () => void }) {
    const t = useTranslations(
        "(without-resolve-user)/cookie-consent-notice/close-button",
    )
    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 sm:relative sm:right-0 sm:top-0"
            onClick={() => handleClose()}
            aria-label={t("title")}
        >
            <X className="h-4 w-4" />
        </Button>
    )
}
