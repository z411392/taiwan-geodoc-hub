import { PlanTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/plan-types"
import { type Plan } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/plan"

export const plans: Plan[] = [
    {
        id: `${PlanTypes._10000}`,
        points: Number(PlanTypes._10000),
        price: 1000,
        bonus: 1000,
    },
    {
        id: `${PlanTypes._5000}`,
        points: Number(PlanTypes._5000),
        price: 500,
        bonus: 300,
    },
    {
        id: `${PlanTypes._3000}`,
        points: Number(PlanTypes._3000),
        price: 300,
        bonus: 100,
    },
    {
        id: `${PlanTypes._1000}`,
        points: Number(PlanTypes._1000),
        price: 100,
        bonus: 0,
    },
]
