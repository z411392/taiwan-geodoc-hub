"use client"

import { useTranslations } from "next-intl"
import { Info } from "lucide-react"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/top-up/rules/point-consumption",
    )
    return (
        <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
                {t("title")}
                <br />
                {t.rich("description", {
                    br: () => <br />,
                })}
            </p>
        </div>
    )
}
