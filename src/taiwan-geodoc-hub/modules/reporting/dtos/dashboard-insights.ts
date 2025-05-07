import { type DashboardInsightType } from "@/taiwan-geodoc-hub/modules/reporting/enums/dashboard-insight-type"

export type DashboardInsights = {
    [value in DashboardInsightType]: number
}
