import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import { ListTransactions } from "@/taiwan-geodoc-hub/modules/transaction-managing/application/queries/list-transactions"

const skip = false
const group = skip ? describe.skip : describe

group("ListTransactions 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListTransactions
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(ListTransactions)
    })

    test("要能夠取得 transactions", async () => {
        const transactions = await handler(undefined, 1)
        expect(transactions).toBeDefined()
        expect(transactions.total).toBeGreaterThan(0)
    })
})
