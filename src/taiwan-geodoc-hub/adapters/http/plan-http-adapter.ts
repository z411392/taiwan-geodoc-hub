import { type SearchPlanPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/search-plan-port"
import { type Plan } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/plan"
import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"

@injectable()
export class PlanHttpAdapter implements SearchPlanPort {
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}
    async search(): Promise<Plan[]> {
        const { tenantId } = this
        try {
            const {
                data: {
                    data: { plans },
                },
            } = await axios.get<
                ResponsePayload<{
                    plans: Plan[]
                }>
            >(
                `${this.apiEndpoint}/tenants/:tenantId/plans`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return plans
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
