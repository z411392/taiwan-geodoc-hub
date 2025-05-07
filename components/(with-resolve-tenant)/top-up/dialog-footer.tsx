"use client"

import { DialogFooter } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function ({
    setIsDialogOpen,
}: {
    setIsDialogOpen: (open: boolean) => void
}) {
    const t = useTranslations("(with-resolve-tenant)/top-up/dialog-footer")
    return (
        <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t("close")}
            </Button>
        </DialogFooter>
    )
}
