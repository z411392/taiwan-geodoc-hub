import { FileText } from "lucide-react"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/upload-snapshot/drag-drop")
    return (
        <>
            <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <div className="text-sm font-medium mb-2">{t("title")}</div>
            <div className="text-xs text-muted-foreground mb-4">
                {t("description")}
            </div>
        </>
    )
}
