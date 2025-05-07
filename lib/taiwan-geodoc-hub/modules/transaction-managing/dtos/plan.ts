import { type PlanTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/plan-types"

export type Plan = {
    id: `${PlanTypes}`
    points: number
    price: number
    bonus: number
}
