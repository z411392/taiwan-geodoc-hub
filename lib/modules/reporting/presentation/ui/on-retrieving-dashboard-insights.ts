import {
  type RetrievingDashboardInsights,
  RetrieveDashboardInsights,
} from "@/lib/modules/reporting/application/queries/retrieve-dashboard-insights"
import { InsightDao } from "@/lib/adapters/insigt-dao"

export const onRetrievingDashboardInsights = async (
  query: RetrievingDashboardInsights,
) => {
  const handler = new RetrieveDashboardInsights({
    insightDao: new InsightDao(),
  })
  return await handler(query)
}
