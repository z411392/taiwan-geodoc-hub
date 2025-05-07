"use client"

import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function ({ onDeclined }: { onDeclined: () => void }) {
    const t = useTranslations(
        "(without-resolve-user)/cookie-consent-notice/decline-button",
    )
    return (
        <Button variant="outline" size="sm" onClick={() => onDeclined()}>
            {t("title")}
        </Button>
    )
}
