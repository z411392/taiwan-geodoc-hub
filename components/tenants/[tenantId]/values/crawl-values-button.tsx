import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Search } from "lucide-react"
import { FileText } from "lucide-react"
import { useTranslations } from "next-intl"
import { Routes } from "@/lib/constants/routes"

export default function CrawlValuesButton() {
  const t = useTranslations(Routes.Values)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Search className="mr-2 h-4 w-4" />
          {t("buttons.query")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("metadata.title")}</DialogTitle>
          <DialogDescription>{t("metadata.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="border-2 border-dashed rounded-lg p-12 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <div className="text-sm font-medium mb-2">
              {t("sections.drag-and-drop.title")}
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              {t("sections.drag-and-drop.description")}
            </div>
            <Button size="sm">{t("buttons.select-file")}</Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">{t("buttons.cancel")}</Button>
          <Button>{t("buttons.submit")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
