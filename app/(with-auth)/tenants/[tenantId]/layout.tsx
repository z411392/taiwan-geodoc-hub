import Header from "~/components/tenants/[tenantId]/header"
import Sidebar from "~/components/tenants/[tenantId]/sidebar"
import Footer from "~/components/tenants/[tenantId]/footer"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { resolveTokens } from "~/auth/resolve-tokens"
import {
    loggerToken,
    userIdToken,
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import TenantProvider from "~/composables/providers/tenant-provider"
import { type ReactNode } from "react"
import { ListNotifications } from "@/taiwan-geodoc-hub/modules/notifying/application/queries/list-notifications"
import { Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { Scopes } from "@/taiwan-geodoc-hub/modules/access-managing/constants/scopes"
import { RetrieveTenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/queries/retrieve-tenant"
import { resolveUser } from "~/auth/resolve-user"
import { createConsola } from "consola"

const scopesOf = (role: `${Roles}`) => {
    if (role === Roles.Manager) {
        return [
            Scopes.ViewDashboard,
            Scopes.BrowseSnapshots,
            Scopes.UploadSnapshots,
            Scopes.ParseSnapshots,
            Scopes.BrowseValuesCrawled,
            Scopes.CrawlValues,
            Scopes.BrowseTransactions,
            Scopes.BrowseMembers,
            Scopes.InviteMembers,
            Scopes.RemoveMembers,
            Scopes.AssignMemberRole,
        ]
    }
    return [
        Scopes.ViewDashboard,
        Scopes.BrowseSnapshots,
        Scopes.UploadSnapshots,
        Scopes.ParseSnapshots,
        Scopes.BrowseValuesCrawled,
        Scopes.CrawlValues,
    ]
}

export default async function WithTenant({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ tenantId: string }>
}) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthenticated()
    const user = resolveUser(tokens.decodedToken)
    const [{ tenantId }, container] = await Promise.all([params, bootstrap()])
    container.register(idTokenToken, { useValue: tokens.token })
    container.register(userIdToken, { useValue: user.uid })
    container.register(tenantIdToken, { useValue: tenantId })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
            tenantId: container.resolve(tenantIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
    const retrieveTenant = container.resolve(RetrieveTenant)
    const tenant = await retrieveTenant()
    const listNotifications = container.resolve(ListNotifications)
    /**
     * @todo 之後要改做成無限捲動
     */
    const { records: notifications } = await listNotifications(undefined, 1)
    const scopes = scopesOf(tenant.role)
    return (
        <TenantProvider
            tenant={tenant}
            notifications={notifications}
            scopes={scopes}
        >
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
