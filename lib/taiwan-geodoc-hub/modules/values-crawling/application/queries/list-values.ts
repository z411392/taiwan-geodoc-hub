import CallableInstance from "callable-instance"

import { type Regions } from "@/taiwan-geodoc-hub/infrastructure/regions"
import { type ValueStatuses } from "@/taiwan-geodoc-hub/modules/values-crawling/constants/value-statuses"
import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"
import { ValueDao } from "@/taiwan-geodoc-hub/modules/values-crawling/domain/ports/value-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingValues = [
    `${Regions}` | undefined,
    `${ValueStatuses}` | undefined,
    string,
    number,
]

@injectable()
export class ListValues extends CallableInstance<
    ListingValues,
    Promise<{ records: Value[]; total: number }>
> {
    constructor(
        @inject(ValueDao as NonAbstractClass<ValueDao>)
        protected valueDao: ValueDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(
        region: `${Regions}` | undefined,
        status: `${ValueStatuses}` | undefined,
        keyword: string,
        page: number,
    ) {
        const timestamp = Date.now()
        try {
            const values = await this.valueDao.byPage(
                region,
                status,
                keyword,
                page,
            )
            return values
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
                data: {
                    region,
                    status,
                    keyword,
                    page,
                },
            })
        }
    }
}
