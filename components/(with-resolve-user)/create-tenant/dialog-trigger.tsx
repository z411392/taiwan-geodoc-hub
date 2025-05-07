import { Button } from "~/components/shadcn/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ({ openDialog }: { openDialog: () => void }) {
    const t = useTranslations(
        "(with-resolve-user)/create-tenant/dialog-trigger",
    )
    return (
        <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-dashed p-4 text-gray-500"
            onClick={() => openDialog()}
        >
            <Plus className="h-5 w-5" />
            <span>{t("title")}</span>
        </Button>
    )
}
