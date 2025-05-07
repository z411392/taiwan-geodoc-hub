import { type TenantStatus } from "@/taiwan-geodoc-hub/modules/tenant-managing/enums/tenant-status"
import { type RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"

export type Tenant = {
    id: string
    name: string
    points: number
    status: `${TenantStatus}`
}

export type TenantWithRole = Tenant & {
    role: `${RoleType}`
}
