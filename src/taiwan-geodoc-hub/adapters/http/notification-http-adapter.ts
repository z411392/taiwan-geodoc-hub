import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type SearchNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/search-notification-port"
import { type CountUnreadNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/count-unread-notification-port"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { type MarkNotificationAsReadPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/mark-notification-as-read-port"
import { type NotificationWithReadStatus } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"

@injectable()
export class NotificationHttpAdapter
    implements
        SearchNotificationPort,
        CountUnreadNotificationPort,
        MarkNotificationAsReadPort
{
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}

    async search(page: number = 1) {
        const { tenantId } = this
        try {
            const {
                data: {
                    data: {
                        messages: { records, total },
                    },
                },
            } = await axios.get<
                ResponsePayload<{
                    messages: {
                        records: NotificationWithReadStatus[]
                        total: number
                    }
                }>
            >(
                `${this.apiEndpoint}/tenants/:tenantId/notifications`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                    params: {
                        page,
                    },
                },
            )
            return {
                records,
                total,
            }
        } catch (thrown) {
            throw this.unserializeException(thrown)
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

    async markAsRead(notificationId: string) {
        const { tenantId } = this
        try {
            await axios.put<ResponsePayload>(
                `${this.apiEndpoint}/tenants/:tenantId/notifications/:notificationId/read`
                    .replace(`:tenantId`, tenantId)
                    .replace(`:notificationId`, notificationId),
                {},
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
