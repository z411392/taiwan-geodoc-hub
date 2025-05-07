"use client"

import { useTranslations } from "next-intl"
import { MessageSquareText } from "lucide-react"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/top-up/contact-info/header",
    )
    return (
        <h3 className="font-medium flex items-center mb-2">
            <MessageSquareText className="h-4 w-4 mr-2" />
            {t("title")}
        </h3>
    )
}
