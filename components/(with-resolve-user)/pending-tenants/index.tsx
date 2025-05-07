import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import PendingTenant from "~/components/(with-resolve-user)/pending-tenants/pending-tenant"
import Header from "~/components/(with-resolve-user)/pending-tenants/header"

export default function ({
    tenants,
    isBackgroundTaskRunning,
}: {
    tenants: TenantWithRole[]
    isBackgroundTaskRunning: boolean
}) {
    if (tenants.length === 0) return null
    return (
        <div className="mb-8 space-y-4">
            <Header />
            {tenants.map((tenant) => (
                <PendingTenant
                    key={tenant.id}
                    tenant={tenant}
                    isBackgroundTaskRunning={isBackgroundTaskRunning}
                />
            ))}
        </div>
    )
}
