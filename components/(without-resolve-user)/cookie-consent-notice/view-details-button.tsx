"use client"

import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function ({
    handleViewDetails,
}: {
    handleViewDetails: () => void
}) {
    const t = useTranslations(
        "(without-resolve-user)/cookie-consent-notice/view-details-button",
    )
    return (
        <Button variant="outline" size="sm" onClick={() => handleViewDetails()}>
            {t("title")}
        </Button>
    )
}
