import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type Registration } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/registration"
import { RegistrationDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/registration-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingRegistrations = []

@injectable()
export class ListRegistrations extends CallableInstance<
    ListingRegistrations,
    Promise<Registration[]>
> {
    constructor(
        @inject(RegistrationDao as NonAbstractClass<RegistrationDao>)
        protected readonly registrationDao: RegistrationDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const timestamp = Date.now()
        try {
            const registrations = await this.registrationDao.all()
            return registrations
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
