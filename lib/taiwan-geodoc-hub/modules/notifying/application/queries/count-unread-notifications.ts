import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type CountingUnreadNotifications = []

@injectable()
export class CountUnreadNotifications extends CallableInstance<
    CountingUnreadNotifications,
    Promise<number>
> {
    constructor(
        @inject(NotificationDao as NonAbstractClass<NotificationDao>)
        protected notificationDao: NotificationDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const timestamp = Date.now()
        try {
            const notifications = await this.notificationDao.countUnread()
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
                data: {},
            })
        }
    }
}
