import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { ListTenants } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/list-tenants"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("ListTenants 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListTenants
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        handler = container.resolve(ListTenants)
    })

    test("要能夠取得 tenants", async () => {
        const tenants = await handler()
        expect(tenants).toBeDefined()
        expect(tenants.length).toBeGreaterThan(0)
    })
})
