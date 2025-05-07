import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { ValueDao } from "@/taiwan-geodoc-hub/modules/values-crawling/domain/ports/value-dao"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("ValueDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let valueDao: ValueDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        valueDao = container.resolve(ValueDao as NonAbstractClass<ValueDao>)
    })

    test("要能夠取得 values", async () => {
        const values = await valueDao.byPage(undefined, undefined, "", 1)
        expect(values).toBeDefined()
        expect(values.total).toBeGreaterThan(0)
    })
})
