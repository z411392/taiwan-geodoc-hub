import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { CollectDashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/application/collect-dashboard-insights"

const skip = false
const group = skip ? describe.skip : describe

group("ListDashboardInsights 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: CollectDashboardInsights
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(CollectDashboardInsights)
    })

    test("要能夠取得 dashboard insights", async () => {
        const insights = await handler()
        expect(insights).toBeDefined()
    })
})
