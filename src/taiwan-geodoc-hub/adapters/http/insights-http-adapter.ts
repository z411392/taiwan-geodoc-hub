import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { type RetrieveDashboardInsightsPort } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/retrieve-dashboard-insights-port"
import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"

@injectable()
export class InsightsHttpAdapter implements RetrieveDashboardInsightsPort {
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}

    async dashboardInsights() {
        const { tenantId } = this
        try {
            const {
                data: {
                    data: { insights },
                },
            } = await axios.get<
                ResponsePayload<{
                    insights: DashboardInsights
                }>
            >(
                `${this.apiEndpoint}/tenants/:tenantId/insights/dashboard`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return insights
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
