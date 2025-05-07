"use client"

import { MessageSquareText } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import useCopyToClipboard from "~/composables/use-copy-to-clipboard"
import { useTranslations } from "next-intl"
import { Copy } from "lucide-react"

export default function ({ email }: { email: string }) {
    const t = useTranslations("(with-resolve-tenant)/top-up/contact-info/email")
    const { copyToClipboard } = useCopyToClipboard({
        title: t("title"),
        description: t("description", { email }),
    })
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <MessageSquareText className="h-4 w-4 mr-2" />
                <span>{t("info", { email })}</span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copyToClipboard(email)}
            >
                <Copy className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}
