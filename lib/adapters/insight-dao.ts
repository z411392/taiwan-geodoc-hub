export interface DashboardInsights {
  updatedAt: number
  parsed: number
  parsedThisMonth: number
  crawled: number
  crawledThisMonth: number
  members: number
  managers: number
}

export interface TransactionInsights {
  updatedAt: number
  points: number
  pointsUsedThisMonth: number
  pointsTopUpedThisMonth: number
}

export class InsightDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}
  async dashboard() {
    return {
      updatedAt: Date.now(),
      parsed: 32,
      parsedThisMonth: 8,
      crawled: 18,
      crawledThisMonth: 5,
      members: 5,
      managers: 3,
    } as DashboardInsights
  }
  async transactions() {
    return {
      updatedAt: Date.now(),
      points: 250,
      pointsUsedThisMonth: 15,
      pointsTopUpedThisMonth: 150,
    } as TransactionInsights
  }
}
