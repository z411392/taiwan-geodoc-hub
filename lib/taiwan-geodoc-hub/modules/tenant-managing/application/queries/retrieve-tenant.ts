import CallableInstance from "callable-instance"
import TenantNotFound from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/tenant-not-found"
import PermissionDeinied from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/permission-denied"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import {
    loggerToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type RetrievingTenant = []

export type TenantWithRole = Tenant & {
    role: `${Roles}`
}

@injectable()
export class RetrieveTenant extends CallableInstance<
    RetrievingTenant,
    Promise<TenantWithRole>
> {
    constructor(
        @inject(TenantDao as NonAbstractClass<TenantDao>)
        protected readonly tenantDao: TenantDao,
        @inject(RoleDao as NonAbstractClass<RoleDao>)
        protected readonly roleDao: RoleDao,
        @inject(tenantIdToken) protected readonly tenantId: string,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }

    async execute() {
        const timestamp = Date.now()
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
            return {
                ...tenant,
                role,
            }
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {},
            })
        }
    }
}
