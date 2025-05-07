export interface DashboardInsights {
  lastCreditDepositDate: string
  totalParsedTranscripts: number
  monthlyParsedTranscripts: number
  totalCrawledAnnouncements: number
  monthlyCrawledAnnouncements: number
  totalTeamMembers: number
  activeTeamMembers: number
}

export class InsightDao {
  async forDashboard(_tenantId: string) {
    return {
      lastCreditDepositDate: "2023/12/15",
      totalParsedTranscripts: 32,
      monthlyParsedTranscripts: 8,
      totalCrawledAnnouncements: 18,
      monthlyCrawledAnnouncements: 5,
      totalTeamMembers: 5,
      activeTeamMembers: 3,
    } as DashboardInsights
  }
}
