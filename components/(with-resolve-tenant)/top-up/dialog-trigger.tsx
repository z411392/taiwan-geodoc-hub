"use client"

import { DialogTrigger } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/top-up/dialog-trigger")
    return (
        <DialogTrigger asChild>
            <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                {t("title")}
            </Button>
        </DialogTrigger>
    )
}
