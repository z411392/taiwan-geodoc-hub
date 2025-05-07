import { DialogTrigger } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/upload-snapshot/dialog-trigger",
    )
    return (
        <DialogTrigger asChild>
            <Button size="sm" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                {t("title")}
            </Button>
        </DialogTrigger>
    )
}
