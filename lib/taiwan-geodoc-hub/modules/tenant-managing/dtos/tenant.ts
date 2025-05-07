import { type TenantStatuses } from "@/taiwan-geodoc-hub/modules/tenant-managing/constants/tenant-statuses"

export type Tenant = {
    id: string
    name: string
    points: number
    status: `${TenantStatuses}`
}
