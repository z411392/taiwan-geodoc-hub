import { context } from "./context"
import { startupWithResolveUser } from "./startup-with-resolve-user"
import { GetTenantByIdPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/get-tenant-by-id-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { TenantNotFound } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/tenant-not-found"
import { TenantId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

export const startupWithResolveTenant = async (tenantId: string) => {
    if (!context["withTenant"]) {
        const container = await startupWithResolveUser()
        const getTenantByIdPort = container.resolve(
            GetTenantByIdPort as NonAbstractClass<GetTenantByIdPort>,
        )
        const tenant = await getTenantByIdPort.byId(tenantId)
        if (!tenant) throw new TenantNotFound(tenantId)
        container.register(TenantId, { useValue: tenantId })
        context["tenant"] = tenant
        context["withTenant"] = container
    }
    return context["withTenant"]
}
