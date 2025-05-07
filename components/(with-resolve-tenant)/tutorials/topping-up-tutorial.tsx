import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/tutorials/topping-up-tutorial",
    )
    return (
        <div className="rounded-lg border p-3">
            <h3 className="font-medium">{t("title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">
                {t("description")}
            </p>
            <Button variant="link" className="px-0 mt-2">
                {t("get-started")}
            </Button>
        </div>
    )
}
