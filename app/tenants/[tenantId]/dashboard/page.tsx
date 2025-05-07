import { FileText, Search, CreditCard, Users } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { getTranslations } from "next-intl/server"
import { onRetrievingProfile } from "@/lib/modules/access-managing/presentation/controllers/on-retrieving-profile"
import { onListingDashboardInsights } from "@/lib/modules/reporting/presentation/controllers/on-listing-dashboard-insights"
import { DateTime } from "luxon"
import TopUpButton from "@/components/tenants/[tenantId]/transactions/top-up-button"
import UploadSnapshotButton from "@/components/tenants/[tenantId]/snapshots/upload-snapshot-button"
import CrawlValuesButton from "@/components/tenants/[tenantId]/values/crawl-values-button"
import { Routes } from "@/lib/constants/routes"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const { tenantId } = await params
  const t = await getTranslations(Routes.Dashboard)
  const profile = await onRetrievingProfile({ tenantId, sessionCookie: "" })
  const insights = await onListingDashboardInsights({ tenantId })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("metadata.title")}
        </h1>
        <div className="flex gap-2">
          <UploadSnapshotButton />
          <CrawlValuesButton />
          <TopUpButton currentPoints={profile.tenant.points} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("sections.transactions.title")}
            </CardTitle>
            <div className="`bg-blue-100 p-2 rounded-full`">
              <CreditCard className="`h-4 w-4 text-blue-600`" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {profile.tenant.points}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("sections.transactions.description", {
                date: DateTime.fromMillis(
                  insights.updatedAt || Date.now(),
                ).toFormat("yyyy-MM-dd"),
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("sections.snapshots.title")}
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-full">
              <FileText className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{insights.parsed}</div>
            <p className="text-xs text-muted-foreground">
              {t("sections.snapshots.description", {
                count: insights.parsedThisMonth,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("sections.values.title")}
            </CardTitle>
            <div className="bg-purple-100 p-2 rounded-full">
              <Search className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{insights.crawled}</div>
            <p className="text-xs text-muted-foreground">
              {t("sections.values.description", {
                count: insights.crawledThisMonth,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("sections.members.title")}
            </CardTitle>
            <div className="bg-amber-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{insights.members}</div>
            <p className="text-xs text-muted-foreground">
              {t("sections.members.description", {
                count: insights.managers,
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("sections.quick-start.title")}</CardTitle>
          <CardDescription>
            {t("sections.quick-start.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">{t("tutorials.snapshots.title")}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("tutorials.snapshots.description")}
              </p>
              <Button variant="link" className="px-0 mt-2">
                {t("buttons.view-tutorial")}
              </Button>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">{t("tutorials.values.title")}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("tutorials.values.description")}
              </p>
              <Button variant="link" className="px-0 mt-2">
                {t("buttons.view-tutorial")}
              </Button>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">{t("tutorials.top-up.title")}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("tutorials.top-up.description")}
              </p>
              <Button variant="link" className="px-0 mt-2">
                {t("buttons.contact-customer-service")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
