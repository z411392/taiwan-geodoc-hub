import CallableInstance from "callable-instance"
import {
  type InsightDao,
  type DashboardInsights,
} from "@/lib/adapters/insight-dao"

export interface ListingDashboardInsights {
  tenantId: string
}

export class ListDashboardInsights extends CallableInstance<
  [ListingDashboardInsights],
  Promise<DashboardInsights>
> {
  protected insightDao: InsightDao
  constructor({ insightDao }: { insightDao: InsightDao }) {
    super("execute")
    this.insightDao = insightDao
  }
  async execute({}: ListingDashboardInsights) {
    return await this.insightDao.dashboard()
  }
}
