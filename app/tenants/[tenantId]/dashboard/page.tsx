import { FileText, Search, CreditCard, Users, Plus } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import { getTranslations } from "next-intl/server"
import { onRetrievingProfile } from "@/lib/modules/access-managing/presentation/ui/on-retrieving-profile"
import { onRetrievingActivities } from "@/lib/modules/notifying/presentation/ui/on-retrieving-activities"
import { onRetrievingDashboardInsights } from "@/lib/modules/reporting/presentation/ui/on-retrieving-dashboard-insights"
import { type Activity, ActivityStatuses } from "@/lib/adapters/activity-dao"

async function ActivityRecord({ activity }: { activity: Activity }) {
  const t = await getTranslations("/")
  let variant: "info" | "success" | "error" = "info"
  if (activity.status === ActivityStatuses.Failed) variant = "error"
  else if (
    [`${ActivityStatuses.Success}`, `${ActivityStatuses.Completed}`].includes(
      activity.status,
    )
  )
    variant = "success"
  return (
    <div className="space-y-4" key={activity.date}>
      <div className="flex items-center justify-between border-b pb-2 last:border-0">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {t(`activities.${activity.type}`, activity.payload)}
          </p>
          <p className="text-xs text-muted-foreground">{activity.date}</p>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant={variant}>
            {t(`statuses.activities.${activity.status}`)}
          </Badge>
          <span className="text-xs text-muted-foreground mt-1">
            {activity.date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const { tenantId } = await params
  const t = await getTranslations("/tenants/[tenantId]/dashboard")
  const profile = await onRetrievingProfile({ tenantId, sessionCookie: "" })
  const activities = await onRetrievingActivities({ tenantId })
  const insights = await onRetrievingDashboardInsights({ tenantId })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("metadata.title")}
        </h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            {t("buttons.upload-transcript")}
          </Button>
          <Button size="sm" variant="outline">
            <Search className="mr-2 h-4 w-4" />
            {t("buttons.crawl-values")}
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t("buttons.deposit-points")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.points")}
            </CardTitle>
            <div className="`bg-blue-100 p-2 rounded-full`">
              <CreditCard className="`h-4 w-4 text-blue-600`" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.tenant.points}</div>
            <p className="text-xs text-muted-foreground">
              {t("infos.last-deposit", {
                date: insights.lastCreditDepositDate,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.transcripts")}
            </CardTitle>
            <div className="bg-green-100 p-2 rounded-full">
              <FileText className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.totalParsedTranscripts}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("infos.monthly-transcripts", {
                count: insights.monthlyParsedTranscripts,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.values")}
            </CardTitle>
            <div className="bg-purple-100 p-2 rounded-full">
              <Search className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.totalCrawledAnnouncements}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("infos.monthly-values", {
                count: insights.monthlyCrawledAnnouncements,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.members")}
            </CardTitle>
            <div className="bg-amber-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.totalTeamMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("infos.members", { count: insights.activeTeamMembers })}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("cards.activities")}</CardTitle>
            <CardDescription>{t("infos.activities")}</CardDescription>
          </CardHeader>
          <CardContent>
            {activities.map((activity) => ActivityRecord({ activity }))}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("cards.quick-start")}</CardTitle>
            <CardDescription>{t("infos.quick-start")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">
                  {t("tutorials.transcripts.title")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("tutorials.transcripts.description")}
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
                <h3 className="font-medium">
                  {t("tutorials.deposit-points.title")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("tutorials.deposit-points.description")}
                </p>
                <Button variant="link" className="px-0 mt-2">
                  {t("buttons.contact-customer-service")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
