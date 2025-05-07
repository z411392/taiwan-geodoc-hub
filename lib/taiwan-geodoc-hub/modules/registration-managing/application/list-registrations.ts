import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type Registration } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/registration"
import { RegistrationDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/registration-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListRegistrations extends CallableInstance<
    [],
    Promise<Registration[]>
> {
    constructor(
        @inject(RegistrationDao as NonAbstractClass<RegistrationDao>)
        protected registrationDao: RegistrationDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute() {
        const start = Date.now()
        try {
            const registrations = await this.registrationDao.all()
            const elapsed = Date.now() - start
            this.logger.info("ListRegistrations executed", { elapsed })
            return registrations
        } catch (thrown) {
            this.logger.error("ListRegistrations failed", { thrown })
            throw thrown
        }
    }
}
