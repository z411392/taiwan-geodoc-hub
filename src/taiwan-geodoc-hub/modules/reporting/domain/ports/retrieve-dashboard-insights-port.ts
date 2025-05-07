import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"

export abstract class RetrieveDashboardInsightsPort {
    abstract dashboardInsights(): Promise<DashboardInsights>
}
