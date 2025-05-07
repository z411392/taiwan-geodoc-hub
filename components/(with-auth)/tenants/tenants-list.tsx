"use client"

import { Card, CardContent } from "~/components/shadcn/card"
import { Avatar } from "~/components/shadcn/avatar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "~/components/shadcn/badge"
import CreateTenantButton from "~/components/(with-auth)/tenants/create-tenant-button"
import Header from "~/components/(public)/header"
import Footer from "~/components/(public)/footer"
import { useTranslations } from "next-intl"
import { useContainer } from "~/composables/contexts/with-resolve-user"
import { useEffect, useState } from "react"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { Loader2 } from "lucide-react"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { WaitForProcessCompletionPort } from "@/taiwan-geodoc-hub/modules/general/domain/ports/wait-for-process-completion-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/search-tenant-port"

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

export default function TenantsList() {
    const _ = useTranslations(Route.Root)
    const t = useTranslations(Route.TenantSelection)
    const container = useContainer()
    const [isLoading, setIsLoading] = useState(true)
    const [tenants, setTenants] = useState<TenantWithRole[]>([])
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
        setTenants([...tenants, tenant])
        await waitForProcessCompletionPort.waitFor(traceId)
        setIsBackgroundTaskRunning(false)
    }
    const ApprovedTenant = createApprovedTenantComponent(_)
    const PendingTenant = createPendingTenantComponent(_)

    const searchTenantPort = container.resolve(
        SearchTenantPort as NonAbstractClass<SearchTenantPort>,
    )

    useEffect(() => {
        let cancel = false
        const run = async () => {
            setIsLoading(true)
            const tenants = await searchTenantPort.search()
            if (cancel) {
                setIsLoading(false)
                return
            }
            setTenants(tenants)
            setIsLoading(false)
        }
        run()
        return () => {
            cancel = true
        }
    }, [])

    useEffect(() => {
        setGroups(groupTenantsByStatus(tenants))
        setTotal(tenants.length)
    }, [tenants])
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
                            <div className="mb-8 space-y-4">
                                {groups.approved?.map((tenant) => (
                                    <ApprovedTenant
                                        key={tenant.id}
                                        tenant={tenant}
                                    />
                                ))}
                            </div>

                            {groups.pending?.length > 0 && (
                                <div className="mb-8 space-y-4">
                                    <h2 className="text-xl font-medium text-gray-700">
                                        {t("sections.pending.title")}
                                    </h2>
                                    {groups.pending?.map((tenant) => (
                                        <PendingTenant
                                            key={tenant.id}
                                            tenant={tenant}
                                            isBackgroundTaskRunning={
                                                isBackgroundTaskRunning
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            {!groups.pending && total < 5 && (
                                <div className="mb-8 space-y-4">
                                    <CreateTenantButton
                                        onTenantCreated={onTenantCreated}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

const createApprovedTenantComponent = (
    _: ReturnType<typeof useTranslations>,
) => {
    const Approved = ({ tenant }: { tenant: TenantWithRole }) => {
        return (
            <Link
                href={Route.Dashboard.replace("[tenantId]", String(tenant.id))}
                key={tenant.id}
                className="block"
            >
                <Card className="transition-all hover:shadow-md">
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 bg-teal-100 text-teal-700 justify-center items-center">
                                <span className="text-lg font-medium">
                                    {tenant.name.charAt(0)}
                                </span>
                            </Avatar>
                            <div>
                                <h3 className="font-medium text-gray-800">
                                    {tenant.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {_(`enums.role-type.${tenant.role}`)}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </CardContent>
                </Card>
            </Link>
        )
    }
    return Approved
}

const createPendingTenantComponent = (
    _: ReturnType<typeof useTranslations>,
) => {
    const Pending = ({
        tenant,
        isBackgroundTaskRunning,
    }: {
        tenant: TenantWithRole
        isBackgroundTaskRunning: boolean
    }) => {
        return (
            <Card
                key={tenant.id}
                className="border-dashed border-gray-300 bg-gray-50"
            >
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 bg-gray-200 text-gray-500 justify-center items-center">
                            <span className="text-lg font-medium">
                                {tenant.name.charAt(0)}
                            </span>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-600">
                                    {tenant.name}
                                </h3>
                                {isBackgroundTaskRunning && (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground inline-block" />
                                )}
                                {!isBackgroundTaskRunning && (
                                    <Badge
                                        variant="outline"
                                        className="bg-amber-50 text-amber-600"
                                    >
                                        {_(
                                            `enums.tenant-status.${tenant.status}`,
                                        )}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">
                                {_(`enums.role-type.${tenant.role}`)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return Pending
}
