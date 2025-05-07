import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class CountUnreadNotifications extends CallableInstance<
    [],
    Promise<number>
> {
    constructor(
        @inject(NotificationDao as NonAbstractClass<NotificationDao>)
        protected notificationDao: NotificationDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const start = Date.now()
        try {
            const notifications = await this.notificationDao.countUnread()
            const elapsed = Date.now() - start
            this.logger.info("CountUnreadNotifications executed", { elapsed })
            return notifications
        } catch (thrown) {
            this.logger.error("CountUnreadNotifications failed", { thrown })
            throw thrown
        }
    }
}
