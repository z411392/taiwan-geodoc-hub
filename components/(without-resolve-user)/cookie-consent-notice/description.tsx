"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function ({
    handleViewDetails,
}: {
    handleViewDetails: () => void
}) {
    const t = useTranslations(
        "(without-resolve-user)/cookie-consent-notice/description",
    )
    return t.rich("description", {
        PrivacyPolicy: (text) => (
            <Link
                href="javascript:void(0)"
                onClick={() => handleViewDetails()}
                className="text-teal-600 hover:underline"
            >
                {text}
            </Link>
        ),
    })
}
