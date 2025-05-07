import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type SearchNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/search-notification-port"
import { type CountUnreadNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/count-unread-notification-port"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { TenantId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

@injectable()
export class NotificationHttpAdapter
    implements SearchNotificationPort, CountUnreadNotificationPort
{
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}

    async search(page: number) {
        return {
            records: [],
            total: 0,
        }
    }

    async count() {
        const { tenantId } = this
        try {
            const {
                data: {
                    data: { unread },
                },
            } = await axios.get<ResponsePayload<{ unread: number }>>(
                `${this.apiEndpoint}/tenants/:tenantId/notifications/unread`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return unread
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
