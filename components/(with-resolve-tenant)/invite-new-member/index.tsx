"use client"

import { Button } from "~/components/shadcn/button"
import { Input } from "~/components/shadcn/input"
import { UserPlus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/shadcn/dialog"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function () {
    const t = useTranslations(Route.Members)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        {t("buttons.invite-new-member")}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t("sections.invite-new-member.title")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("sections.invite-new-member.description")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {t("sections.send-invitation.title")}
                            </label>
                            <Input
                                placeholder={t(
                                    "sections.send-invitation.description",
                                )}
                                type="email"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            {t("buttons.cancel")}
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>
                            {t("buttons.send-invitation")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
