import CallableInstance from "callable-instance"
import { type Plan, PlanDao } from "@/lib/adapters/plan-dao"

export interface ListingPlans {
  tenantId: string
}

export class ListPlans extends CallableInstance<
  [ListingPlans],
  Promise<Plan[]>
> {
  protected planDao: PlanDao
  constructor({ planDao }: { planDao: PlanDao }) {
    super("execute")
    this.planDao = planDao
  }
  async execute({}: ListingPlans) {
    return await this.planDao.all({})
  }
}
