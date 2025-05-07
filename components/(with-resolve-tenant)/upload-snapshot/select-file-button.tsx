import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/upload-snapshot/select-file-button",
    )
    return <Button size="sm">{t("title")}</Button>
}
