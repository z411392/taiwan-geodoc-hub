import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { startupWithResolveTenant } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-tenant"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchMembersPort } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/search-members-port"
import MemberTable from "~/components/(with-resolve-tenant)/member-table"
import MembersProvider from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/members-provider"
import { redirect } from "next/navigation"

const collectSearchParams = async (
    searchParams: Promise<{ page: any; role: any; q: any }>,
) => {
    let { page, role, q } = await searchParams
    page = parseInt(page)
    let needRedirect = false
    if (!page || page < 0) {
        page = 1
        needRedirect = true
    }
    if (![...Object.values(RoleType), "all"].includes(role)) {
        role = "all"
        needRedirect = true
    }
    if (typeof q === "undefined") {
        q = ""
        needRedirect = true
    }
    if (needRedirect) {
        const newSearchParams = new URLSearchParams({
            page,
            role,
            q,
        })
        return redirect(`?${newSearchParams.toString()}`)
    }
    return {
        page,
        role,
        q,
    }
}

export default async function ({
    params,
    searchParams,
}: {
    params: Promise<{ tenantId: string }>
    searchParams: Promise<{ page: any; role: any; q: any }>
}) {
    const { page, role, q } = await collectSearchParams(searchParams)
    const { tenantId } = await params
    const container = await startupWithResolveTenant(tenantId)
    const searchMembersPort = container.resolve(
        SearchMembersPort as NonAbstractClass<SearchMembersPort>,
    )
    const { records: members, total } = await searchMembersPort.search(
        page,
        role === "all" ? undefined : (role as `${RoleType}`),
        q,
    )
    return (
        <MembersProvider
            page={page}
            role={role}
            q={q}
            members={members}
            total={total}
        >
            <MemberTable />
        </MembersProvider>
    )
}
