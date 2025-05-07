import { DialogTrigger } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/crawl-values/dialog-trigger",
    )
    return (
        <>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    {t("title")}
                </Button>
            </DialogTrigger>
        </>
    )
}
