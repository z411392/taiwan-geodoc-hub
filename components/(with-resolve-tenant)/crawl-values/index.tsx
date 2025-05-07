import { Dialog, DialogContent } from "~/components/shadcn/dialog"
import { FileText } from "lucide-react"
import DialogTrigger from "~/components/(with-resolve-tenant)/crawl-values/dialog-trigger"
import DialogHeader from "~/components/(with-resolve-tenant)/crawl-values/dialog-header"
import DragDrop from "~/components/(with-resolve-tenant)/crawl-values/drag-drop"
import SelectFileButton from "~/components/(with-resolve-tenant)/crawl-values/select-file-button"
import DialogFooter from "~/components/(with-resolve-tenant)/crawl-values/dialog-footer"

export default function () {
    return (
        <Dialog>
            <DialogTrigger />
            <DialogContent>
                <DialogHeader />
                <div className="grid gap-4 py-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <DragDrop />
                        <SelectFileButton />
                    </div>
                </div>
                <DialogFooter />
            </DialogContent>
        </Dialog>
    )
}
