import { Card, CardContent } from "@/components/shadcn/card"
import { Avatar } from "@/components/shadcn/avatar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Routes } from "@/lib/constants/routes"
import { onListingTenants } from "@/lib/modules/access-managing/presentation/controllers/on-listing-tenants"
import { type TenantWithRole } from "@/lib/modules/access-managing/application/queries/list-tenants"
import { Badge } from "@/components/shadcn/badge"
import CreateTenantButton from "@/components/(outer)/tenants/create-tenant-button"
import { type TenantStatus } from "@/lib/adapters/tenant-dao"

export async function generateMetadata() {
  const t = await getTranslations(Routes.TenantSelection)
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}

async function Approved({ tenant }: { tenant: TenantWithRole }) {
  const _ = await getTranslations(Routes.Root)
  return (
    <Link
      href={Routes.Dashboard.replace("[tenantId]", String(tenant.id))}
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
              <h3 className="font-medium text-gray-800">{tenant.name}</h3>
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

async function Pendding({ tenant }: { tenant: TenantWithRole }) {
  const _ = await getTranslations(Routes.Root)
  return (
    <Card key={tenant.id} className="border-dashed border-gray-300 bg-gray-50">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-gray-200 text-gray-500 justify-center items-center">
            <span className="text-lg font-medium">{tenant.name.charAt(0)}</span>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-600">{tenant.name}</h3>
              <Badge variant="outline" className="bg-amber-50 text-amber-600">
                {_(`statuses.tenants.${tenant.status}`)}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{_(`roles.${tenant.role}`)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function TenantSelectingPage() {
  const tenants = await onListingTenants({ sessionCookie: "" })
  const tenantsByStatus = tenants.reduce(
    (tenantsByStatus, tenant) => {
      const status = tenant.status
      if (!tenantsByStatus[status]) {
        tenantsByStatus[status] = []
      }
      tenantsByStatus[status].push(tenant)
      return tenantsByStatus
    },
    {} as Record<TenantStatus, TenantWithRole[]>,
  )
  const t = await getTranslations(Routes.TenantSelection)
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            {t("metadata.title")}
          </h1>
          <p className="text-gray-600">{t("metadata.description")}</p>
        </div>

        <div className="mb-8 space-y-4">
          {tenantsByStatus.approved?.map((tenant) => Approved({ tenant }))}
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-medium text-gray-700">
            {t("sections.pending.title")}
          </h2>
          {tenantsByStatus.pending?.map((tenant) => Pendding({ tenant }))}
        </div>

        <div className="mb-8 space-y-4">
          <CreateTenantButton />
        </div>
      </div>
    </main>
  )
}
