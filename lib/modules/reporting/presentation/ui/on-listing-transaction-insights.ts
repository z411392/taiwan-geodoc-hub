import {
  type ListingTransactionInsights,
  ListTransactionInsights,
} from "@/lib/modules/reporting/application/queries/list-transaction-insights"
import { InsightDao } from "@/lib/adapters/insight-dao"

export const onListingTransactionInsights = async (
  query: ListingTransactionInsights,
) => {
  const handler = new ListTransactionInsights({
    insightDao: new InsightDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
