import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import ApprovedTenant from "~/components/(with-resolve-user)/approved-tenants/approved-tenant"

export default function ({ tenants }: { tenants: TenantWithRole[] }) {
    return (
        <>
            <div className="mb-8 space-y-4">
                {tenants.map((tenant) => (
                    <ApprovedTenant key={tenant.id} tenant={tenant} />
                ))}
            </div>
        </>
    )
}
