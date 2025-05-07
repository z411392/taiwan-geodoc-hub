import CallableInstance from "callable-instance"

import { type Regions } from "@/taiwan-geodoc-hub/infrastructure/constants/regions"
import { type ValueStatuses } from "@/taiwan-geodoc-hub/modules/values-crawling/constants/value-statuses"
import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"
import { ValueDao } from "@/taiwan-geodoc-hub/modules/values-crawling/domain/ports/value-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListValues extends CallableInstance<
    [`${Regions}` | undefined, `${ValueStatuses}` | undefined, string, number],
    Promise<{ records: Value[]; total: number }>
> {
    constructor(
        @inject(ValueDao as NonAbstractClass<ValueDao>)
        protected valueDao: ValueDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(
        region: `${Regions}` | undefined,
        status: `${ValueStatuses}` | undefined,
        keyword: string,
        page: number,
    ) {
        const start = Date.now()
        try {
            const values = await this.valueDao.byPage(
                region,
                status,
                keyword,
                page,
            )
            const elapsed = Date.now() - start
            this.logger.info("ListValues executed", { elapsed })
            return values
        } catch (thrown) {
            this.logger.error("ListValues failed", { thrown })
            throw thrown
        }
    }
}
