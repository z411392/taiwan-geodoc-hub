import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("TenantDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let tenantDao: TenantDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        tenantDao = container.resolve(TenantDao as NonAbstractClass<TenantDao>)
    })

    test("要能夠由 id 取得 tenant", async () => {
        const tenantId = process.env.TENANT_ID!
        const tenant = await tenantDao.ofId(tenantId)
        expect(tenant).toBeDefined()
    })

    test("要能夠由 ids 取得 tenants", async () => {
        const tenantIds = [process.env.TENANT_ID!]
        const tenants = await tenantDao.inIds(...tenantIds)
        expect(tenants.length).toBe(1)
    })
})
