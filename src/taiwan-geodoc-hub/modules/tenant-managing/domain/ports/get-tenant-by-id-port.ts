import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"

export abstract class GetTenantByIdPort {
    abstract byId(id: string): Promise<TenantWithRole | null>
}
