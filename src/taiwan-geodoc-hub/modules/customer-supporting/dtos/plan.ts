import { type PlanType } from "@/taiwan-geodoc-hub/modules/customer-supporting/enums/plan-type"

export type Plan = {
    id: `${PlanType}`
    points: number
    price: number
    bonus: number
}
