import CallableInstance from "callable-instance"
import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"
import { InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class CollectDashboardInsights extends CallableInstance<
    [],
    Promise<DashboardInsights>
> {
    constructor(
        @inject(InsightDao as NonAbstractClass<InsightDao>)
        protected insightDao: InsightDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const start = Date.now()
        try {
            const insights = await this.insightDao.dashboard()
            const elapsed = Date.now() - start
            this.logger.info("CollectDashboardInsights executed", { elapsed })
            return insights
        } catch (thrown) {
            const error =
                thrown instanceof Error ? thrown.message : String(thrown)
            this.logger.error("CollectDashboardInsights failed", { error })
            throw thrown
        }
    }
}
