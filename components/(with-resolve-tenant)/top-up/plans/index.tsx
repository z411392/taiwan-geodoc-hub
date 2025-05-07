"use client"

import { RadioGroup } from "~/components/shadcn/radio-group"
import { useState } from "react"
import Plan from "~/components/(with-resolve-tenant)/top-up/plans/plan"
import { useTopUpInfo } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/top-up-info-provider"

export default function () {
    const [planId, setPlanId] = useState<string>("")
    const { plans } = useTopUpInfo()
    return (
        <>
            <RadioGroup
                value={planId}
                onValueChange={(id) => {
                    const plan = plans.find((plan) => plan.id === id)
                    if (!plan) return
                    setPlanId(id)
                }}
                className="space-y-3"
            >
                {plans.map((plan) => (
                    <Plan
                        key={plan.id}
                        planId={planId}
                        setPlanId={setPlanId}
                        plan={plan}
                    />
                ))}
            </RadioGroup>
        </>
    )
}
