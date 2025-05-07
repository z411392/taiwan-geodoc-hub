import { type Region } from "@/taiwan-geodoc-hub/modules/general/enums/region"
import { type ValueStatus } from "@/taiwan-geodoc-hub/modules/values-crawling/enums/value-status"

export type Value = {
    id: string
    region?: `${Region}`
    section: string
    number: string
    queryDate: string
    status?: `${ValueStatus}`
    attempts: number
    querier: string
    result: unknown
}
