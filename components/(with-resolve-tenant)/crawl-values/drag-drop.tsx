import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/crawl-values/drag-drop")
    return (
        <>
            <div className="text-sm font-medium mb-2">{t("title")}</div>
            <div className="text-xs text-muted-foreground mb-4">
                {t("description")}
            </div>
        </>
    )
}
