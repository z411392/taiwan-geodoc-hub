import CallableInstance from "callable-instance"
import TenantNotFound from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/tenant-not-found"
import PermissionDeinied from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/permission-denied"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import {
    loggerToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

export type TenantWithRole = Tenant & {
    role: `${Roles}`
}

@injectable()
export class RetrieveTenant extends CallableInstance<
    [],
    Promise<TenantWithRole>
> {
    constructor(
        @inject(TenantDao as NonAbstractClass<TenantDao>)
        protected tenantDao: TenantDao,
        @inject(RoleDao as NonAbstractClass<RoleDao>)
        protected roleDao: RoleDao,
        @inject(tenantIdToken) protected tenantId: string,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }

    async execute() {
        const start = Date.now()
        try {
            const { tenantId } = this
            const tenant = await this.tenantDao.ofId(tenantId)
            if (!tenant) throw new TenantNotFound(tenantId)
            const roles = await this.roleDao.all()
            const found = roles.find(
                ({ tenantId: comparedTo }) => tenantId === comparedTo,
            )
            if (!found) throw new PermissionDeinied(tenantId)
            const { role } = found
            const elapsed = Date.now() - start
            this.logger.info("RetrieveTenant executed", { elapsed })
            return {
                ...tenant,
                role,
            }
        } catch (thrown) {
            const error =
                thrown instanceof Error ? thrown.message : String(thrown)
            this.logger.error("RetrieveTenant failed", { error })
            throw thrown
        }
    }
}
