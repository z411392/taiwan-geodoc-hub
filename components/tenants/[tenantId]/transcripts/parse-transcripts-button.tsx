import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/alert-dialog"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/shadcn/button"

export default function ParseTranscriptsButton({
  selectedItems,
  totalPoints,
}: {
  selectedItems: number
  totalPoints: number
}) {
  const t = useTranslations("/tenants/[tenantId]/transcripts")
  return (
    <>
      {selectedItems > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="default">
              <Play className="mr-2 h-4 w-4" />
              {t("buttons.batch-parse", { totalPoints })}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("notices.confirm-batch-parse.title")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("notices.confirm-batch-parse.description", {
                  selectedItems,
                  totalPoints,
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("buttons.cancel")}</AlertDialogCancel>
              <AlertDialogAction>{t("buttons.confirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
