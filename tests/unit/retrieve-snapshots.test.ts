import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { RetrieveSnapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/application/queries/retrieve-snapshot"
import {
    idTokenToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("RetrieveSnapshot 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: RetrieveSnapshot
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        container.register(snapshotIdToken, {
            useValue: process.env.SNAPSHOT_ID!,
        })
        handler = container.resolve(RetrieveSnapshot)
    })

    test("要能夠由 id 取得 snapshot", async () => {
        const snapshot = await handler()
        expect(snapshot).toBeDefined()
    })
})
