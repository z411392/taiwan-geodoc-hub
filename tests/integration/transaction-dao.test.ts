import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { TransactionDao } from "@/taiwan-geodoc-hub/modules/transaction-managing/domain/ports/transaction-dao"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("TransactionDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let transactionDao: TransactionDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        transactionDao = container.resolve(
            TransactionDao as NonAbstractClass<TransactionDao>,
        )
    })

    test("要能夠取得 transactions", async () => {
        const transactions = await transactionDao.byPage(undefined, 1)
        expect(transactions).toBeDefined()
        expect(transactions.total).toBeGreaterThan(0)
    })
})
