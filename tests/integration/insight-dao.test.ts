import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("InsightDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let insightDao: InsightDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        insightDao = container.resolve(
            InsightDao as NonAbstractClass<InsightDao>,
        )
    })

    test("要能夠取得 dashboard insights", async () => {
        const insights = await insightDao.dashboard()
        expect(insights).toBeDefined()
    })
    test("要能夠取得 transaction insights", async () => {
        const insights = await insightDao.transactions()
        expect(insights).toBeDefined()
    })
})
