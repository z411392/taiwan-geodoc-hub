"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/shadcn/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog"
import { useState } from "react"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Routes } from "@/lib/constants/routes"

export default function CreateTenantButton() {
  const t = useTranslations(Routes.TenantSelection)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tenantName, setCompanyName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!tenantName.trim()) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCompanyName("")
    setIsSubmitting(false)
    setIsDialogOpen(false)
    alert(t("sections.create-new-tenant.notices.tenant-created"))
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 border-dashed p-4 text-gray-500"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-5 w-5" />
        <span>{t("buttons.create-new-tenant")}</span>
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("sections.create-new-tenant.title")}</DialogTitle>
            <DialogDescription>
              {t("sections.create-new-tenant.description")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-left">
                  {t("sections.create-new-tenant.inputs.name.label")}
                </Label>
                <Input
                  id="name"
                  placeholder={t(
                    "sections.create-new-tenant.inputs.name.placeholder",
                  )}
                  value={tenantName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                {t("buttons.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !tenantName.trim()}
              >
                {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
