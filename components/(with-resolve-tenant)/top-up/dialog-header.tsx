"use client"

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/shadcn/dialog"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/top-up/dialog-header")
    return (
        <DialogHeader>
            <DialogTitle className="text-center text-xl">
                {t("title")}
            </DialogTitle>
            <DialogDescription className="text-center">
                {t("description")}
            </DialogDescription>
        </DialogHeader>
    )
}
