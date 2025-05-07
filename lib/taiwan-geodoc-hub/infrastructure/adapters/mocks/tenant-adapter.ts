import { injectable, inject } from "tsyringe"
import { type TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { TenantStatuses } from "@/taiwan-geodoc-hub/modules/tenant-managing/constants/tenant-statuses"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"

const tenants: Record<string, Tenant> = {
    "1": {
        id: "1",
        name: "台北不動產顧問有限公司",
        points: 100,
        status: TenantStatuses.Approved,
    },
    "2": {
        id: "2",
        name: "新北市地政事務所",
        points: 200,
        status: TenantStatuses.Pending,
    },
    "3": {
        id: "3",
        name: "高雄房地產開發股份有限公司",
        points: 300,
        status: TenantStatuses.Rejected,
    },
}

@injectable()
export class TenantAdapter implements TenantDao {
    constructor(@inject(idTokenToken) protected idToken: string) {}
    async ofId(tenantId: string): Promise<Tenant | undefined> {
        const tenant = tenants[tenantId]
        if (!tenant) return undefined
        if (tenant.status === TenantStatuses.Rejected) return undefined
        return tenant
    }
    async inIds(...tenantIds: string[]): Promise<Tenant[]> {
        return tenantIds
            .map((tenantId) => tenants[tenantId])
            .filter(
                (tenant) => tenant && tenant.status !== TenantStatuses.Rejected,
            )
    }
}
