"use client"

import { RadioGroupItem } from "~/components/shadcn/radio-group"
import { Label } from "~/components/shadcn/label"
import { useTranslations } from "next-intl"
import { type Plan } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/plan"

export default function ({
    plan,
    planId,
    setPlanId,
}: {
    plan: Plan
    planId: string
    setPlanId: (planId: string) => void
}) {
    const t = useTranslations("(with-resolve-tenant)/top-up/plans/plan")
    return (
        <div
            className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${planId === plan.id ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setPlanId(plan.id)}
        >
            <div className="flex items-center gap-3">
                <RadioGroupItem value={`${plan.id}`} id={`plan-${plan.id}`} />
                <Label htmlFor={`plan-${plan.id}`} className="cursor-pointer">
                    <div className="font-medium">
                        {t("points", {
                            points: plan.points,
                        })}
                    </div>
                    {plan.bonus > 0 && (
                        <div className="text-xs text-green-600">
                            {t("bonus", {
                                bonus: plan.bonus,
                            })}
                        </div>
                    )}
                </Label>
            </div>
            <div className="font-medium">
                {t("price", { price: plan.price })}
            </div>
        </div>
    )
}
