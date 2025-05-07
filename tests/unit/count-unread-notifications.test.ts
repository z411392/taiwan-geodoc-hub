import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { CountUnreadNotifications } from "@/taiwan-geodoc-hub/modules/notifying/application/queries/count-unread-notifications"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("CountUnreadNotifications 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: CountUnreadNotifications
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(CountUnreadNotifications)
    })

    test("要能夠取得未讀通知數量", async () => {
        const unreadCount = await handler()
        expect(unreadCount).toBeGreaterThan(0)
    })
})
