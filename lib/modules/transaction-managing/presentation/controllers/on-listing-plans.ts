import { ListPlans } from "@/lib/modules/transaction-managing/application/queries/list-plans"
import { PlanDao } from "@/lib/adapters/plan-dao"

export const onListingPlans = async ({ tenantId }: { tenantId: string }) => {
  const handler = new ListPlans({
    planDao: new PlanDao({ tenantId }),
  })
  return await handler({ tenantId })
}
