import {
    bootstrap,
    shutdown,
} from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type DependencyContainer } from "tsyringe"
import { RetrieveContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/application/queries/retrieve-contact-info"

const skip = false
const group = skip ? describe.skip : describe

group("RetrieveContactInfo 相關功能", () => {
    let container: DependencyContainer
    beforeAll(async () => (container = await bootstrap()))
    afterAll(async () => await shutdown())

    let handler: RetrieveContactInfo
    beforeEach(async () => {
        handler = container.resolve(RetrieveContactInfo)
    })

    test("要能夠取得 contact info", async () => {
        const contactInfo = await handler()
        expect(contactInfo).toBeDefined()
    })
})
