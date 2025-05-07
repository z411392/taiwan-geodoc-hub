import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { MemberDao } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/member-dao"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("MemberDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let memberDao: MemberDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        memberDao = container.resolve(MemberDao as NonAbstractClass<MemberDao>)
    })

    test("要能夠取得 members", async () => {
        const members = await memberDao.byPage(undefined, "", 1)
        expect(members).toBeDefined()
        expect(members.total).toBeGreaterThan(0)
    })
})
