import { type Region } from "@/taiwan-geodoc-hub/modules/general/enums/region"
import { type ValueStatus } from "@/taiwan-geodoc-hub/modules/values-crawling/enums/value-status"
import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"

export abstract class ValueDao {
    abstract byPage(
        region: `${Region}` | undefined,
        status: `${ValueStatus}` | undefined,
        keyword: string,
        page: number,
    ): Promise<{ records: Value[]; total: number }>
}
