"use client"

import { useTranslations } from "next-intl"

export default function () {
    const _ = useTranslations("_")
    return (
        <footer className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>
                {_("constants.copyright", {
                    year: "2025",
                })}
            </p>
        </footer>
    )
}
