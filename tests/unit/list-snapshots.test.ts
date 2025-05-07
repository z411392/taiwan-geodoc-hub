import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { ListSnapshots } from "@/taiwan-geodoc-hub/modules/registration-managing/application/list-snapshots"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("ListSnapshots 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListSnapshots
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(ListSnapshots)
    })

    test("要能夠取得 snapshots", async () => {
        const snapshots = await handler("", 1)
        expect(snapshots).toBeDefined()
        expect(snapshots.records.length).toBeGreaterThan(0)
    })
})
