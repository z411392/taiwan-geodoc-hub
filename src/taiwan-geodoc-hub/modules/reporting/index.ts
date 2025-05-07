import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { RetrieveDashboardInsightsPort } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/retrieve-dashboard-insights-port"
import { InsightsHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/insights-http-adapter"

@registry([
    {
        token: RetrieveDashboardInsightsPort as NonAbstractClass<RetrieveDashboardInsightsPort>,
        useClass: InsightsHttpAdapter,
    },
])
export abstract class ReportingModule {}
