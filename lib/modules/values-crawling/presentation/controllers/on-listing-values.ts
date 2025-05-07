import {
  type ListingValues,
  ListValues,
} from "@/lib/modules/values-crawling/application/queries/list-values"
import { ValueDao } from "@/lib/adapters/values-dao"

export const onListingValues = async (query: ListingValues) => {
  const handler = new ListValues({
    valueDao: new ValueDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
