import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import { ListValues } from "@/taiwan-geodoc-hub/modules/values-crawling/application/queries/list-values"

const skip = false
const group = skip ? describe.skip : describe

group("ListValues 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListValues
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(ListValues)
    })

    test("要能夠取得 values", async () => {
        const values = await handler(undefined, undefined, "", 1)
        expect(values).toBeDefined()
        expect(values.total).toBeGreaterThan(0)
    })
})
