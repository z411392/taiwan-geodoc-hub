import { Card, CardContent } from "~/components/shadcn/card"
import { Avatar } from "~/components/shadcn/avatar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { Badge } from "~/components/shadcn/badge"
import CreateTenantButton from "~/components/(with-auth)/tenants/create-tenant-button"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/list-tenants"
import { getTranslations } from "next-intl/server"
import { resolveTokens } from "~/auth/resolve-tokens"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { ListTenants } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/list-tenants"
import Header from "~/components/(public)/header"
import Footer from "~/components/(public)/footer"

export const generateMetadata = async () => {
    const t = await getTranslations(Pages.TenantSelection)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

const createApprovedComponent = (
    _: Awaited<ReturnType<typeof getTranslations>>,
) => {
    const Approved = async ({ tenant }: { tenant: TenantWithRole }) => {
        return (
            <Link
                href={Pages.Dashboard.replace("[tenantId]", String(tenant.id))}
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
                                    {_(`roles.${tenant.role}`)}
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

const createPendingComponent = (
    _: Awaited<ReturnType<typeof getTranslations>>,
) => {
    const Pending = async ({ tenant }: { tenant: TenantWithRole }) => {
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
                                <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-600"
                                >
                                    {_(`statuses.tenants.${tenant.status}`)}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                                {_(`roles.${tenant.role}`)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return Pending
}

export default async function Tenants() {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthenticated()
    const [t, _, container] = await Promise.all([
        getTranslations(Pages.TenantSelection),
        getTranslations(Pages.Root),
        bootstrap(),
    ])

    const Approved = createApprovedComponent(_)
    const Pending = createPendingComponent(_)
    container.register(idTokenToken, { useValue: tokens.token })
    const listTenants = container.resolve(ListTenants)
    const tenants = await listTenants()
    const tenantsGroupedByStatus: { [status: string]: TenantWithRole[] } = {}
    for (const tenant of tenants) {
        const status = `${tenant.status}`
        if (!tenantsGroupedByStatus[status]) tenantsGroupedByStatus[status] = []
        tenantsGroupedByStatus[status].push(tenant)
    }
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

                    <div className="mb-8 space-y-4">
                        {tenantsGroupedByStatus.approved?.map((tenant) => (
                            <Approved key={tenant.id} tenant={tenant} />
                        ))}
                    </div>

                    <div className="mb-8 space-y-4">
                        <h2 className="text-xl font-medium text-gray-700">
                            {t("sections.pending.title")}
                        </h2>
                        {tenantsGroupedByStatus.pending?.map((tenant) => (
                            <Pending key={tenant.id} tenant={tenant} />
                        ))}
                    </div>

                    <div className="mb-8 space-y-4">
                        <CreateTenantButton />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
