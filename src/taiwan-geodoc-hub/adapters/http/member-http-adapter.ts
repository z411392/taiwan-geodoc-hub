import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type SearchMembersPort } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/search-members-port"
import { type RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { type User } from "firebase/auth"

@injectable()
export class MemberHttpAdapter implements SearchMembersPort {
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}
    async search(page: number, role: `${RoleType}` | undefined, q: string) {
        try {
            const {
                data: {
                    data: { members },
                },
            } = await axios.get<
                ResponsePayload<{
                    members: {
                        records: Array<User & { role: `${RoleType}` }>
                        total: number
                    }
                }>
            >(
                `${this.apiEndpoint}/tenants/:tenantId/members`.replace(
                    ":tenantId",
                    this.tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                    params: {
                        page,
                        role,
                        q,
                    },
                },
            )
            return members
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
