import CallableInstance from "callable-instance"
import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"
import { CustomerSupportDao } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/customer-supprt-dao"
import { inject, injectable } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class RetrieveContactInfo extends CallableInstance<
    [],
    Promise<ContactInfo>
> {
    constructor(
        @inject(CustomerSupportDao as NonAbstractClass<CustomerSupportDao>)
        protected customerSupportDao: CustomerSupportDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const start = Date.now()
        try {
            const contactInfo = await this.customerSupportDao.contactInfo()
            const elapsed = Date.now() - start
            this.logger.info("RetrieveContactInfo executed", { elapsed })
            return contactInfo
        } catch (thrown) {
            const error =
                thrown instanceof Error ? thrown.message : String(thrown)
            this.logger.error("RetrieveContactInfo failed", { error })
            throw thrown
        }
    }
}
