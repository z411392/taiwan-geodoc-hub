import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("NotificationDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let notificationDao: NotificationDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        notificationDao = container.resolve(
            NotificationDao as NonAbstractClass<NotificationDao>,
        )
    })

    test("要能夠取得 notifications", async () => {
        const notifications = await notificationDao.byPage(undefined, "", 1)
        expect(notifications).toBeDefined()
        expect(notifications.total).toBeGreaterThan(0)
    })

    test("要能夠取得未讀通知數量", async () => {
        const unreadCount = await notificationDao.countUnread()
        expect(unreadCount).toBeGreaterThan(0)
    })
})
