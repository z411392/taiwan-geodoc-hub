"use client"

import Header from "~/components/(without-resolve-tenant)/header"
import Footer from "~/components/(without-resolve-tenant)/footer"
import { useTranslations } from "next-intl"
import { useContainer } from "~/composables/providers/trace-id-provider/user-provider"
import { useEffect, useState } from "react"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { Loader2 } from "lucide-react"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { WaitForProcessCompletionPort } from "@/taiwan-geodoc-hub/modules/general/domain/ports/wait-for-process-completion-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/search-tenant-port"
import ApprovedTenants from "~/components/(with-resolve-user)/approved-tenants"
import PendingTenants from "~/components/(with-resolve-user)/pending-tenants"
import CreateTenant from "~/components/(with-resolve-user)/create-tenant"

type TenantGroups = { [status: string]: TenantWithRole[] }
const groupTenantsByStatus = (tenants: TenantWithRole[]) => {
    const groups: TenantGroups = {}
    for (const tenant of tenants) {
        const status = `${tenant.status}`
        if (!groups[status]) groups[status] = []
        groups[status].push(tenant)
    }
    return groups
}

const useTenants = () => {
    const container = useContainer()
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<TenantGroups>({})
    const [total, setTotal] = useState(0)
    const [isBackgroundTaskRunning, setIsBackgroundTaskRunning] =
        useState(false)

    const waitForProcessCompletionPort = container.resolve(
        WaitForProcessCompletionPort as NonAbstractClass<WaitForProcessCompletionPort>,
    )
    const onTenantCreated = async ({
        traceId,
        tenant,
    }: {
        traceId: string
        tenant: TenantWithRole
    }) => {
        setIsBackgroundTaskRunning(true)
        setGroups((groups) => ({
            ...groups,
            pending: [tenant],
        }))
        setTotal((total) => total + 1)
        await waitForProcessCompletionPort.waitFor(traceId)
        setIsBackgroundTaskRunning(false)
    }

    const searchTenantPort = container.resolve(
        SearchTenantPort as NonAbstractClass<SearchTenantPort>,
    )

    useEffect(() => {
        const run = async () => {
            setIsLoading(true)
            const tenants = await searchTenantPort.search()
            setGroups(groupTenantsByStatus(tenants))
            setTotal(tenants.length)
            setIsLoading(false)
        }
        run()
    }, [])

    return {
        isLoading,
        groups,
        total,
        isBackgroundTaskRunning,
        onTenantCreated,
    }
}

export default function () {
    const t = useTranslations(Route.TenantSelection)
    const {
        isLoading,
        groups,
        total,
        isBackgroundTaskRunning,
        onTenantCreated,
    } = useTenants()

    const showCreateTenant = () =>
        (!groups.pending || groups.pending.length === 0) && total < 5

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-emerald-50">
            <Header />
            <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-gray-800">
                            {t("metadata.title")}
                        </h1>
                        <p className="text-gray-600">
                            {t("metadata.description")}
                        </p>
                    </div>

                    {isLoading && (
                        <>
                            <div className="mb-8 space-y-4 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground inline-block" />
                            </div>
                        </>
                    )}

                    {!isLoading && (
                        <>
                            <ApprovedTenants tenants={groups.approved ?? []} />
                            <PendingTenants
                                tenants={groups.pending ?? []}
                                isBackgroundTaskRunning={
                                    isBackgroundTaskRunning
                                }
                            />
                            {showCreateTenant() && (
                                <CreateTenant
                                    onTenantCreated={onTenantCreated}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
