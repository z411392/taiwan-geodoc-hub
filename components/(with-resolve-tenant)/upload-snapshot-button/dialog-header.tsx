import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/shadcn/dialog"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/upload-snapshot-button/dialog-header",
    )
    return (
        <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
    )
}
