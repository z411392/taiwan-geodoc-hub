import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"

export abstract class SearchTenantPort {
    abstract search(): Promise<TenantWithRole[]>
}
