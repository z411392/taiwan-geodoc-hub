import { PlanType } from "@/taiwan-geodoc-hub/modules/customer-supporting/enums/plan-type"
import { type Plan } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/plan"

export const plans: Plan[] = [
    {
        id: `${PlanType.TenThousand}`,
        points: Number(PlanType.TenThousand),
        price: 1000,
        bonus: 1000,
    },
    {
        id: `${PlanType.FiveThousand}`,
        points: Number(PlanType.FiveThousand),
        price: 500,
        bonus: 300,
    },
    {
        id: `${PlanType.ThreeThousand}`,
        points: Number(PlanType.ThreeThousand),
        price: 300,
        bonus: 100,
    },
    {
        id: `${PlanType.OneThousand}`,
        points: Number(PlanType.OneThousand),
        price: 100,
        bonus: 0,
    },
]
