import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const skip = false
const group = skip ? describe.skip : describe

group("RoleDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let roleDao: RoleDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        roleDao = container.resolve(RoleDao as NonAbstractClass<RoleDao>)
    })

    test("要能夠取得 roles", async () => {
        const roles = await roleDao.all()
        expect(roles).toBeDefined()
        expect(roles.length).toBeGreaterThan(0)
    })
})
