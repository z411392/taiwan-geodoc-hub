import { type Plan } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/plan"

export abstract class SearchPlanPort {
    abstract search(): Promise<Plan[]>
}
