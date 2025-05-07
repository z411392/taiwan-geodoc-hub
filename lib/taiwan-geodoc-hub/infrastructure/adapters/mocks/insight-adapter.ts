import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"
import { type TransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/transaction-insights"
import { type InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import { injectable, inject } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

@injectable()
export class InsightAdapter implements InsightDao {
    constructor(
        @inject(idTokenToken) protected idToken: string,
        @inject(tenantIdToken) protected tenantId: string,
    ) {}
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
