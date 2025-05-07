import {
  type ListingDashboardInsights,
  ListDashboardInsights,
} from "@/lib/modules/reporting/application/queries/list-dashboard-insights"
import { InsightDao } from "@/lib/adapters/insight-dao"

export const onListingDashboardInsights = async (
  query: ListingDashboardInsights,
) => {
  const handler = new ListDashboardInsights({
    insightDao: new InsightDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
