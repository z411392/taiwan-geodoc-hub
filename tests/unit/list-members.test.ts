import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { ListMembers } from "@/taiwan-geodoc-hub/modules/member-managing/application/queries/list-members"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("ListMembers 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: ListMembers
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        handler = container.resolve(ListMembers)
    })

    test("要能夠取得 members", async () => {
        const members = await handler(undefined, "", 1)
        expect(members).toBeDefined()
        expect(members.total).toBeGreaterThan(0)
    })
})
