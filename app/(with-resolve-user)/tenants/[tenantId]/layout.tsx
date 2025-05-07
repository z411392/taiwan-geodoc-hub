import Header from "~/components/(with-resolve-tenant)/header"
import Sidebar from "~/components/(with-resolve-tenant)/sidebar"
import Footer from "~/components/(with-resolve-tenant)/footer"
import TenantProvider from "~/composables/contexts/with-resolve-tenant"
import { type ReactNode } from "react"
import { startupWithResolveTenant } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-tenant"
import { context } from "@/taiwan-geodoc-hub/utils/lifespan/context"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { Scope } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/scope"

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

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) => {
    const { tenantId } = await params
    await startupWithResolveTenant(tenantId)
    const tenant = context.tenant!
    return {
        title: {
            default: tenant.name,
            template: `%s | ${tenant.name}`,
        },
        description: "",
    }
}

export default async function ({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ tenantId: string }>
}) {
    const { tenantId } = (await params) as { tenantId: string }
    await startupWithResolveTenant(tenantId)
    const tenant = context.tenant!
    const scopes = scopesOf(tenant.role)
    return (
        <TenantProvider tenant={tenant} scopes={scopes}>
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
