import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { RetrieveTenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/queries/retrieve-tenant"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("RetrieveTenant 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: RetrieveTenant
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(RetrieveTenant)
    })

    test("要能夠取得 tenant", async () => {
        const tenant = await handler()
        expect(tenant).toBeDefined()
    })
})
