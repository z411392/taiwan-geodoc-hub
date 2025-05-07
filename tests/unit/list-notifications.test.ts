import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { ListNotifications } from "@/taiwan-geodoc-hub/modules/notifying/application/list-notifications"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("ListNotifications 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListNotifications
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(ListNotifications)
    })

    test("要能夠取得 notifications", async () => {
        const notifications = await handler(undefined, "", 1)
        expect(notifications).toBeDefined()
        expect(notifications.total).toBeGreaterThan(0)
    })
})
