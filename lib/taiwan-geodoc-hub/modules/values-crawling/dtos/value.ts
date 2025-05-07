import { type Regions } from "@/taiwan-geodoc-hub/infrastructure/regions"
import { type ValueStatuses } from "@/taiwan-geodoc-hub/modules/values-crawling/constants/value-statuses"

export type Value = {
    id: string
    region?: `${Regions}`
    section: string
    number: string
    queryDate: string
    status?: `${ValueStatuses}`
    attempts: number
    querier: string
    result: unknown
}
