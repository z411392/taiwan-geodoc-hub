import { DialogFooter } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/upload-snapshot/dialog-footer",
    )
    return (
        <DialogFooter>
            <Button variant="outline">{t("buttons.cancel")}</Button>
            <Button>{t("buttons.upload")}</Button>
        </DialogFooter>
    )
}
