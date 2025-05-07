import { type SearchTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/search-tenant-port"
import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import axios from "axios"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { type CreateTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/create-tenant-port"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type GetTenantByIdPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/get-tenant-by-id-port"

@injectable()
export class TenantHttpAdapter
    implements SearchTenantPort, CreateTenantPort, GetTenantByIdPort
{
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
    ) {}
    async search() {
        try {
            const {
                data: {
                    data: {
                        tenants: { records },
                    },
                },
            } = await axios.get<
                ResponsePayload<{ tenants: { records: TenantWithRole[] } }>
            >(`${this.apiEndpoint}/tenants`, {
                headers: {
                    Authorization: `Bearer ${this.idToken}`,
                },
            })
            return records
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
    async create(name: string) {
        try {
            const {
                data: {
                    data: { tenantId },
                },
                headers: { "x-trace-id": traceId },
            } = await axios.post<ResponsePayload<{ tenantId: string }>>(
                `${this.apiEndpoint}/tenants`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return { tenantId, traceId }
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
    async byId(tenantId: string) {
        try {
            const {
                data: {
                    data: { tenant },
                },
            } = await axios.get<ResponsePayload<{ tenant: TenantWithRole }>>(
                `${this.apiEndpoint}/tenants/:tenantId`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return tenant
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
