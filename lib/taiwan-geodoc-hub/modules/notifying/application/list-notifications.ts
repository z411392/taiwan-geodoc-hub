import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/constants/events"
import { type Severities } from "@/taiwan-geodoc-hub/infrastructure/constants/severities"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListNotifications extends CallableInstance<
    [`${Severities}` | undefined, number],
    Promise<{ records: Notification<EventTypes>[]; total: number }>
> {
    constructor(
        @inject(NotificationDao as NonAbstractClass<NotificationDao>)
        protected notificationDao: NotificationDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(severity: `${Severities}` | undefined, page: number) {
        const start = Date.now()
        try {
            const notifications = await this.notificationDao.byPage(
                severity,
                page,
            )
            const elapsed = Date.now() - start
            this.logger.info("ListNotifications executed", { elapsed })
            return notifications
        } catch (thrown) {
            const error =
                thrown instanceof Error ? thrown.message : String(thrown)
            this.logger.error("ListNotifications failed", { error })
            throw thrown
        }
    }
}
