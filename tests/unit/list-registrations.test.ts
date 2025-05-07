import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { ListRegistrations } from "@/taiwan-geodoc-hub/modules/registration-managing/application/queries/list-registrations"
import {
    idTokenToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("ListRegistrations 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListRegistrations
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        container.register(snapshotIdToken, {
            useValue: process.env.SNAPSHOT_ID!,
        })
        handler = container.resolve(ListRegistrations)
    })

    test("要能夠取得 registrations", async () => {
        const registrations = await handler()
        expect(registrations).toBeDefined()
        expect(registrations.length).toBeGreaterThan(0)
    })
})
