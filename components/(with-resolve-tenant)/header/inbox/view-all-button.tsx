import { Button } from "~/components/shadcn/button"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/header/inbox/view-all-button",
    )
    return (
        <Button variant="ghost" className="w-full justify-between" size="sm">
            <span>{t("title")}</span>
            <ArrowRight className="h-4 w-4" />
        </Button>
    )
}
