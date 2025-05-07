import CallableInstance from "callable-instance"
import { type TransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/transaction-insights"
import { InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class CollectTransactionInsights extends CallableInstance<
    [],
    Promise<TransactionInsights>
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
            const insights = await this.insightDao.transactions()
            const elapsed = Date.now() - start
            this.logger.info("CollectTransactionInsights executed", { elapsed })
            return insights
        } catch (thrown) {
            this.logger.error("CollectTransactionInsights failed", { thrown })
            throw thrown
        }
    }
}
