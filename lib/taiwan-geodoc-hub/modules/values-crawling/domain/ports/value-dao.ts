import { type Regions } from "@/taiwan-geodoc-hub/infrastructure/constants/regions"
import { type ValueStatuses } from "@/taiwan-geodoc-hub/modules/values-crawling/constants/value-statuses"
import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"

export abstract class ValueDao {
    abstract byPage(
        region: `${Regions}` | undefined,
        status: `${ValueStatuses}` | undefined,
        keyword: string,
        page: number,
    ): Promise<{ records: Value[]; total: number }>
}
