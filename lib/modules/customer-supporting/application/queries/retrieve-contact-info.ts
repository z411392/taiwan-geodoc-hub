import CallableInstance from "callable-instance"
import {
  CustomerSupportDao,
  type ContactInfo,
} from "@/lib/adapters/customer-support-dao"

export interface RetrievingContactInfo {
  tenantId: string
}

export class RetrieveContactInfo extends CallableInstance<
  [RetrievingContactInfo],
  Promise<ContactInfo>
> {
  protected customerSupportDao: CustomerSupportDao
  constructor({
    customerSupportDao,
  }: {
    customerSupportDao: CustomerSupportDao
  }) {
    super("execute")
    this.customerSupportDao = customerSupportDao
  }
  async execute({}: RetrievingContactInfo) {
    return await this.customerSupportDao.contactInfo({})
  }
}
