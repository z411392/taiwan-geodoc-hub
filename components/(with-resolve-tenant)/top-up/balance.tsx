"use client"

import { useTranslations } from "next-intl"
import { useTenant } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/top-up/balance")
    const tenant = useTenant()!
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm">{t("title")}</div>
            <div className="font-medium">
                {t("description", { points: tenant.points })}
            </div>
        </div>
    )
}
