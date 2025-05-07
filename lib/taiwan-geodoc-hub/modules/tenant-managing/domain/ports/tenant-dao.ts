import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"

export abstract class TenantDao {
    abstract ofId(tenantId: string): Promise<Tenant | undefined>
    abstract inIds(...tenantIds: string[]): Promise<Tenant[]>
}
