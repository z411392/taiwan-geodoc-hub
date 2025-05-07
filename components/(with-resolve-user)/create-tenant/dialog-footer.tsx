import { DialogFooter } from "~/components/shadcn/dialog"
import { Button } from "~/components/shadcn/button"
import { useTranslations } from "next-intl"
import { Loader2Icon } from "lucide-react"

export default function ({
    isProgressing,
    closeDialog,
    valid,
}: {
    isProgressing: boolean
    closeDialog: () => void
    valid: boolean
}) {
    const t = useTranslations("(with-resolve-user)/create-tenant/dialog-footer")
    return (
        <DialogFooter>
            <Button
                type="button"
                variant="outline"
                onClick={() => closeDialog()}
            >
                {t("cancel")}
            </Button>
            <Button type="submit" disabled={isProgressing || !valid}>
                {isProgressing && (
                    <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        {t("progressing")}
                    </>
                )}
                {!isProgressing && <>{t("create")}</>}
            </Button>
        </DialogFooter>
    )
}
