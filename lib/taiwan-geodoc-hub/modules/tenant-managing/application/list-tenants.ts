import CallableInstance from "callable-instance"
import { RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { injectable, inject } from "tsyringe"
import { TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

export type TenantWithRole = Tenant & {
    role: `${Roles}`
}

@injectable()
export class ListTenants extends CallableInstance<
    [],
    Promise<TenantWithRole[]>
> {
    constructor(
        @inject(TenantDao as NonAbstractClass<TenantDao>)
        protected tenantDao: TenantDao,
        @inject(RoleDao as NonAbstractClass<RoleDao>)
        protected roleDao: RoleDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }

    async execute() {
        const start = Date.now()
        try {
            const roles = await this.roleDao.all()
            const tenantIds = []
            const rolesMap: Record<string, `${Roles}`> = {}
            for (const { tenantId, role } of roles) {
                tenantIds.push(tenantId)
                rolesMap[tenantId] = role
            }
            const tenants = await this.tenantDao.inIds(...tenantIds)
            const tenantsWithRole = tenants.map((tenant) => {
                const role = rolesMap[tenant.id]
                return { ...tenant, role }
            })
            const elapsed = Date.now() - start
            this.logger.info("ListTenants executed", { elapsed })
            return tenantsWithRole
        } catch (thrown) {
            this.logger.error("ListTenants failed", { thrown })
            throw thrown
        }
    }
}
