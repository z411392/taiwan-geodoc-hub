import CallableInstance from "callable-instance"
import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"
import { CustomerSupportDao } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/customer-supprt-dao"
import { inject, injectable } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type RetrievingContactInfo = []

@injectable()
export class RetrieveContactInfo extends CallableInstance<
    RetrievingContactInfo,
    Promise<ContactInfo>
> {
    constructor(
        @inject(CustomerSupportDao as NonAbstractClass<CustomerSupportDao>)
        protected readonly customerSupportDao: CustomerSupportDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const timestamp = Date.now()
        try {
            const contactInfo = await this.customerSupportDao.contactInfo()
            return contactInfo
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {},
            })
        }
    }
}
