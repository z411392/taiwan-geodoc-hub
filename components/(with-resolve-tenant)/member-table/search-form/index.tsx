"use client"

import Role from "~/components/(with-resolve-tenant)/member-table/search-form/role"
import Q from "~/components/(with-resolve-tenant)/member-table/search-form/q"
import { useFormData } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/members-provider"

export default function () {
    const { role, q } = useFormData()
    return (
        <div className="flex flex-wrap gap-4">
            <Role role={role} />
            <Q q={q} />
        </div>
    )
}
