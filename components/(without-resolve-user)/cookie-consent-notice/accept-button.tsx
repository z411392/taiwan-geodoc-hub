"use client"

import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function ({ onAccepted }: { onAccepted: () => void }) {
    const t = useTranslations(
        "(without-resolve-user)/cookie-consent-notice/accept-button",
    )
    return (
        <Button variant="default" size="sm" onClick={() => onAccepted()}>
            {t("title")}
        </Button>
    )
}
