import { DialogFooter } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/crawl-values/dialog-footer",
    )
    return (
        <DialogFooter>
            <Button variant="outline">{t("cancel")}</Button>
            <Button>{t("submit")}</Button>
        </DialogFooter>
    )
}
