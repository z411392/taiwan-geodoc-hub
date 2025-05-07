import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/events"
import { type Severities } from "@/taiwan-geodoc-hub/infrastructure/severities"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingNotifications = [`${Severities}` | undefined, number]

@injectable()
export class ListNotifications extends CallableInstance<
    ListingNotifications,
    Promise<{ records: Notification<EventTypes>[]; total: number }>
> {
    constructor(
        @inject(NotificationDao as NonAbstractClass<NotificationDao>)
        protected notificationDao: NotificationDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(severity: `${Severities}` | undefined, page: number) {
        const timestamp = Date.now()
        try {
            const notifications = await this.notificationDao.byPage(
                severity,
                page,
            )
            return notifications
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
                data: {
                    severity,
                    page,
                },
            })
        }
    }
}
