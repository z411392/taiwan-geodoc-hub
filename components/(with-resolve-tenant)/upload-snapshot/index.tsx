import { Dialog, DialogContent } from "~/components/shadcn/dialog"
import DialogTrigger from "~/components/(with-resolve-tenant)/upload-snapshot/dialog-trigger"
import DialogHeader from "~/components/(with-resolve-tenant)/upload-snapshot/dialog-header"
import DragDrop from "~/components/(with-resolve-tenant)/upload-snapshot/drag-drop"
import SelectFileButton from "~/components/(with-resolve-tenant)/upload-snapshot/select-file-button"
import DialogFooter from "~/components/(with-resolve-tenant)/upload-snapshot/dialog-footer"

export default function () {
    return (
        <>
            <Dialog>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader />
                    <div className="grid gap-4 py-4">
                        <div className="border-2 border-dashed rounded-lg p-12 text-center">
                            <DragDrop />
                            <SelectFileButton />
                        </div>
                    </div>
                    <DialogFooter />
                </DialogContent>
            </Dialog>
        </>
    )
}
