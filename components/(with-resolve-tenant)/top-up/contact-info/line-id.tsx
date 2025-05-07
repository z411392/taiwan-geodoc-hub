"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import useCopyToClipboard from "~/composables/use-copy-to-clipboard"
import { useTranslations } from "next-intl"
import { Copy } from "lucide-react"

export default function ({ lineId }: { lineId: string }) {
    const t = useTranslations(
        "(with-resolve-tenant)/top-up/contact-info/line-id",
    )
    const { copyToClipboard } = useCopyToClipboard({
        title: t("title"),
        description: t("description", { lineId }),
    })
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>{t("info", { lineId })}</span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copyToClipboard(lineId)}
            >
                <Copy className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}
