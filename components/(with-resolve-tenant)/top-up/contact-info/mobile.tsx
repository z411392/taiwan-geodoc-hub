"use client"

import { useTranslations } from "next-intl"
import { Phone } from "lucide-react"
import { Copy } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import useCopyToClipboard from "~/composables/use-copy-to-clipboard"

export default function ({ mobile }: { mobile: string }) {
    const t = useTranslations(
        "(with-resolve-tenant)/top-up/contact-info/mobile",
    )
    const { copyToClipboard } = useCopyToClipboard({
        title: t("title"),
        description: t("description", { mobile }),
    })
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{t("info", { mobile })}</span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copyToClipboard(mobile)}
            >
                <Copy className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}
