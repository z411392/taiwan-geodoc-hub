import { PlanType } from "@/taiwan-geodoc-hub/modules/transaction-managing/enums/plan-type"
import { type Plan } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/plan"

export const plans: Plan[] = [
    {
        id: `${PlanType._10000}`,
        points: Number(PlanType._10000),
        price: 1000,
        bonus: 1000,
    },
    {
        id: `${PlanType._5000}`,
        points: Number(PlanType._5000),
        price: 500,
        bonus: 300,
    },
    {
        id: `${PlanType._3000}`,
        points: Number(PlanType._3000),
        price: 300,
        bonus: 100,
    },
    {
        id: `${PlanType._1000}`,
        points: Number(PlanType._1000),
        price: 100,
        bonus: 0,
    },
]
