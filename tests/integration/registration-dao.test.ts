import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { RegistrationDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/registration-dao"
import {
    idTokenToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

const skip = false
const group = skip ? describe.skip : describe

group("RegistrationDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let registrationDao: RegistrationDao
    beforeEach(async () => {
        container.register(idTokenToken, { useValue: process.env.ID_TOKEN! })
        container.register(tenantIdToken, { useValue: process.env.TENANT_ID! })
        container.register(snapshotIdToken, {
            useValue: process.env.SNAPSHOT_ID!,
        })
        registrationDao = container.resolve(
            RegistrationDao as NonAbstractClass<RegistrationDao>,
        )
    })

    test("要能夠取得 registrations", async () => {
        const registrations = await registrationDao.all()
        expect(registrations).toBeDefined()
        expect(registrations.length).toBeGreaterThan(0)
    })
})
