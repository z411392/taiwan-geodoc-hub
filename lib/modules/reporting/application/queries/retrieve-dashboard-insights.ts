import CallableInstance from "callable-instance"
import {
  type InsightDao,
  type DashboardInsights,
} from "@/lib/adapters/insigt-dao"

export interface RetrievingDashboardInsights {
  tenantId: string
}

export class RetrieveDashboardInsights extends CallableInstance<
  [RetrievingDashboardInsights],
  Promise<DashboardInsights>
> {
  protected insightDao: InsightDao
  constructor({ insightDao }: { insightDao: InsightDao }) {
    super("execute")
    this.insightDao = insightDao
  }
  async execute({ tenantId }: RetrievingDashboardInsights) {
    return await this.insightDao.forDashboard(tenantId)
  }
}
