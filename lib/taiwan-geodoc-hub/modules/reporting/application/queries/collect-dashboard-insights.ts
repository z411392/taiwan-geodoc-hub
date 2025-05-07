import CallableInstance from "callable-instance"
import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"
import { InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type CollectingDashboardInsights = []

@injectable()
export class CollectDashboardInsights extends CallableInstance<
    CollectingDashboardInsights,
    Promise<DashboardInsights>
> {
    constructor(
        @inject(InsightDao as NonAbstractClass<InsightDao>)
        protected insightDao: InsightDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const timestamp = Date.now()
        try {
            const insights = await this.insightDao.dashboard()
            return insights
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {},
            })
        }
    }
}
