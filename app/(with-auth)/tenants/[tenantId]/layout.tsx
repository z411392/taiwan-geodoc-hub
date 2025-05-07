import Header from "~/components/tenants/[tenantId]/header"
import Sidebar from "~/components/tenants/[tenantId]/sidebar"
import Footer from "~/components/tenants/[tenantId]/footer"
import { startup } from "@/taiwan-geodoc-hub/utils/lifespan"
import { resolveTokens } from "~/auth/resolve-tokens"
import {
    TraceId,
    UserId,
    IdToken,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { Unauthorized } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/unauthorized"
import TenantProvider from "~/composables/contexts/with-resolve-tenant"
import { type ReactNode } from "react"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { Scope } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/scope"
import { resolveUser } from "~/auth/resolve-user"
import { TraceIdGenerator } from "@/taiwan-geodoc-hub/infrastructure/generators/trace-id-generator"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { GetTenantByIdPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/get-tenant-by-id-port"
import { TenantNotFound } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/tenant-not-found"

const scopesOf = (role: `${RoleType}`) => {
    if (role === RoleType.Manager) {
        return [
            Scope.ViewDashboard,
            Scope.BrowseSnapshots,
            Scope.UploadSnapshots,
            Scope.ParseSnapshots,
            Scope.BrowseValuesCrawled,
            Scope.CrawlValues,
            Scope.BrowseTransactions,
            Scope.BrowseMembers,
            Scope.InviteMembers,
            Scope.RemoveMembers,
            Scope.AssignMemberRole,
        ]
    }
    return [
        Scope.ViewDashboard,
        Scope.BrowseSnapshots,
        Scope.UploadSnapshots,
        Scope.ParseSnapshots,
        Scope.BrowseValuesCrawled,
        Scope.CrawlValues,
    ]
}

export default async function WithResolveTenant({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ tenantId: string }>
}) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthorized()
    const user = resolveUser(tokens.decodedToken)
    const [{ tenantId }, container] = await Promise.all([
        params,
        startup(false),
    ])
    const nextTraceId = container.resolve(TraceIdGenerator)
    const traceId = nextTraceId()
    container.register(TraceId, { useValue: traceId })
    container.register(IdToken, { useValue: tokens.token })
    container.register(UserId, { useValue: user.uid })
    const getTenantByIdPort = container.resolve(
        GetTenantByIdPort as NonAbstractClass<GetTenantByIdPort>,
    )
    const tenant = await getTenantByIdPort.byId(tenantId)
    if (!tenant) throw new TenantNotFound(tenantId)
    container.register(TenantId, { useValue: tenantId })
    const scopes = scopesOf(tenant.role)
    return (
        <TenantProvider traceId={traceId} tenant={tenant} scopes={scopes}>
            <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-4 md:p-6">
                        {children}
                        <Footer />
                    </main>
                </div>
            </div>
        </TenantProvider>
    )
}
