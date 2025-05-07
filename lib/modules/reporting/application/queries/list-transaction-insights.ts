import CallableInstance from "callable-instance"
import {
  type InsightDao,
  type TransactionInsights,
} from "@/lib/adapters/insight-dao"

export interface ListingTransactionInsights {
  tenantId: string
}

export class ListTransactionInsights extends CallableInstance<
  [ListingTransactionInsights],
  Promise<TransactionInsights>
> {
  protected insightDao: InsightDao
  constructor({ insightDao }: { insightDao: InsightDao }) {
    super("execute")
    this.insightDao = insightDao
  }
  async execute({}: ListingTransactionInsights) {
    return await this.insightDao.transactions()
  }
}
