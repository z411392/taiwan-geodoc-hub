import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"
import { type TransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/transaction-insights"

export abstract class InsightDao {
    abstract dashboard(): Promise<DashboardInsights>
    abstract transactions(): Promise<TransactionInsights>
}
