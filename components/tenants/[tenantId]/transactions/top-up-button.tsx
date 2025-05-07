"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Label } from "@/components/shadcn/label"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group"
import {
  Copy,
  ExternalLink,
  Info,
  MessageSquareText,
  Phone,
  Plus,
} from "lucide-react"
import { useToast } from "@/composables/shadcn/use-toast"
import { useTranslations } from "next-intl"
import { type Plan } from "@/lib/adapters/plan-dao"
import { onListingPlans } from "@/lib/modules/transaction-managing/presentation/controllers/on-listing-plans"
import { useParams } from "next/navigation"
import { onRetrievingContactInfo } from "@/lib/modules/customer-supporting/presentation/controllers/on-retrieving-contact-info"
import { type ContactInfo } from "@/lib/adapters/customer-support-dao"
import { Routes } from "@/lib/constants/routes"

export default function TopUpButton({
  currentPoints,
}: {
  currentPoints: number
}) {
  const __ = useTranslations(Routes.Tenant)
  const t = useTranslations(Routes.Transactions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const { tenantId } = useParams() as { tenantId: string }
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>(
    undefined as unknown as string,
  )
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    {} as unknown as ContactInfo,
  )
  useEffect(() => {
    onRetrievingContactInfo({ tenantId }).then((contactInfo) =>
      setContactInfo(contactInfo),
    )
    onListingPlans({ tenantId }).then((plans) => {
      setPlans(plans)
      const [firstPlan] = plans
      setSelectedPlan(firstPlan.id)
    })
  }, [tenantId])

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: __("notifications.copied.title"),
        description: __("notifications.copied.description", { content }),
        duration: 1500,
      })
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.top-up")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-40px)] overflow-auto">
        <div className="flex flex-col h-full">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {t("sections.top-up-plans.title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t("sections.top-up-plans.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6 overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {t("sections.current-points-balance.title")}
              </div>
              <div className="font-medium">
                {t("sections.current-points-balance.description", {
                  points: currentPoints,
                })}
              </div>
            </div>

            {/* 更新儲值方案顯示部分，添加贈送點數信息 */}
            <RadioGroup
              value={selectedPlan}
              onValueChange={(id) => {
                const plan = plans.find((plan) => plan.id === id)
                if (!plan) return
                setSelectedPlan(id)
              }}
              className="space-y-3"
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedPlan === plan.id ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={`${plan.id}`}
                      id={`plan-${plan.id}`}
                    />
                    <Label
                      htmlFor={`plan-${plan.id}`}
                      className="cursor-pointer"
                    >
                      <div className="font-medium">
                        {t("plan.points", { points: plan.points })}
                      </div>
                      {plan.bonus > 0 && (
                        <div className="text-xs text-green-600">
                          {t("plan.bonus", { bonus: plan.bonus })}
                        </div>
                      )}
                    </Label>
                  </div>
                  <div className="font-medium">
                    {t("plan.price", { price: plan.price })}
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="rounded-lg border p-4 bg-muted/30">
              <h3 className="font-medium flex items-center mb-2">
                <MessageSquareText className="h-4 w-4 mr-2" />
                {t("sections.contact-info.title")}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>
                      {t("contact-info.mobile", { mobile: contactInfo.mobile })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(contactInfo.mobile)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquareText className="h-4 w-4 mr-2" />
                    <span>
                      {t("contact-info.email", { email: contactInfo.email })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(contactInfo.email)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>
                      {t("contact-info.line-id", {
                        lineId: contactInfo.lineId,
                      })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(contactInfo.lineId)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  {t("sections.point-consumption.title")}
                  <br />
                  {t.rich("sections.point-consumption.description", {
                    br: () => <br />,
                  })}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  {t("sections.point-notice.title")}
                  <br />
                  {t("sections.point-notice.description")}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t("buttons.close")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
