import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { CustomerSupportDao } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/customer-supprt-dao"

const skip = false
const group = skip ? describe.skip : describe

group("CustomerSupportDao 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let customerSupportDao: CustomerSupportDao
    beforeEach(async () => {
        customerSupportDao = container.resolve(
            CustomerSupportDao as NonAbstractClass<CustomerSupportDao>,
        )
    })

    test("要能夠取得 contant info", async () => {
        const contactInfo = await customerSupportDao.contactInfo()
        expect(contactInfo).toBeDefined()
    })
})
