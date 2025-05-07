"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "~/components/shadcn/dialog"
import DialogTrigger from "~/components/(with-resolve-tenant)/top-up/dialog-trigger"
import DialogHeader from "~/components/(with-resolve-tenant)/top-up/dialog-header"
import Balance from "~/components/(with-resolve-tenant)/top-up/balance"
import Plans from "~/components/(with-resolve-tenant)/top-up/plans"
import Rules from "~/components/(with-resolve-tenant)/top-up/rules"
import ContactInfo from "~/components/(with-resolve-tenant)/top-up/contact-info"
import DialogFooter from "~/components/(with-resolve-tenant)/top-up/dialog-footer"

export default function () {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger />
            <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-40px)] overflow-auto">
                <div className="flex flex-col h-full">
                    <DialogHeader />
                    <div className="py-4 space-y-6 overflow-y-auto pr-1">
                        <Balance />
                        <Plans />
                        <ContactInfo />
                        <Rules />
                    </div>
                    <DialogFooter setIsDialogOpen={setIsDialogOpen} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
