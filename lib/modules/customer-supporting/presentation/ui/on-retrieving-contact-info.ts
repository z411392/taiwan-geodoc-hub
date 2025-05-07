import {
  type RetrievingContactInfo,
  RetrieveContactInfo,
} from "@/lib/modules/customer-supporting/application/queries/retrieve-contact-info"
import { CustomerSupportDao } from "@/lib/adapters/customer-support-dao"

export const onRetrievingContactInfo = async (query: RetrievingContactInfo) => {
  const handler = new RetrieveContactInfo({
    customerSupportDao: new CustomerSupportDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
