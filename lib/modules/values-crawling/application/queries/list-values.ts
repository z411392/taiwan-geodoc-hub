import CallableInstance from "callable-instance"
import {
  type ValueDao,
  type Value,
  type ValueStatus,
} from "@/lib/adapters/values-dao"
import { type Region } from "@/lib/constants/regions"

export interface ListingValues {
  tenantId: string
  status?: ValueStatus
  keyword: string
  page: number
  region?: Region
}

export class ListValues extends CallableInstance<
  [ListingValues],
  Promise<{ records: Value[]; total: number }>
> {
  protected valueDao: ValueDao
  constructor({ valueDao }: { valueDao: ValueDao }) {
    super("execute")
    this.valueDao = valueDao
  }
  async execute({ status, keyword, page, region }: ListingValues) {
    const values = await this.valueDao.byPage({ status, keyword, page, region })
    return values
  }
}
