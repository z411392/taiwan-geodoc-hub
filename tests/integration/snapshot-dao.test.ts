import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"

const skip = false
const group = skip ? describe.skip : describe

group("SnapshotDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let snapshotDao: SnapshotDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        snapshotDao = container.resolve(
            SnapshotDao as NonAbstractClass<SnapshotDao>,
        )
    })

    test("要能夠由 id 取得 snapshot", async () => {
        const snapshotId = process.env.SNAPSHOT_ID!
        const snapshot = await snapshotDao.byId(snapshotId)
        expect(snapshot).toBeDefined()
    })

    test("要能夠取得 snapshots", async () => {
        const snapshots = await snapshotDao.byPage("", 1)
        expect(snapshots).toBeDefined()
        expect(snapshots.total).toBeGreaterThan(0)
    })
})
