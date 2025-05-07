import { type PlanType } from "@/taiwan-geodoc-hub/modules/transaction-managing/enums/plan-type"

export type Plan = {
    id: `${PlanType}`
    points: number
    price: number
    bonus: number
}
