"use client"

import { useState, useEffect, useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { onListingNotifications } from "@/lib/modules/notifying/presentation/controllers/on-listing-notifications"
import { type Notification } from "@/lib/adapters/notification-dao"
import { EventTypes } from "@/lib/constants/events"
import { Severities } from "@/lib/constants/severities"
import { CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react"
import { useTranslations } from "next-intl"
import { toHumanReadable } from "@/lib/infrastructure/formatters/time"
import { Input } from "@/components/shadcn/input"
import Paginator from "@/components/tenants/[tenantId]/paginator"
import { Routes } from "@/lib/constants/routes"

const useSeverity = () => {
  const searchParams = useSearchParams()
  let severity: Severities | "all" = "all"
  if (
    Object.values(Severities).includes(
      searchParams.get("severity") as Severities,
    )
  )
    severity = searchParams.get("severity") as Severities
  return useState<Severities | "all">(severity)
}

const usePage = () => {
  const searchParams = useSearchParams()
  let page = parseInt(searchParams.get("page") || "1")
  if (isNaN(page) || page < 1) page = 1
  return useState<number>(page)
}

export default function NotificationsTable() {
  const [notifications, setNotifications] = useState<
    Notification<EventTypes>[]
  >([])
  const t = useTranslations(Routes.Notifications)
  const __ = useTranslations(Routes.Tenant)
  const { tenantId } = useParams<{ tenantId: string }>()
  const router = useRouter()
  const [severity, setSeverity] = useSeverity()
  const [page, setPage] = usePage()
  const [total, setTotal] = useState<number>(0)
  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set("severity", severity)
    newSearchParams.set("page", String(page))
    router.replace(`?${newSearchParams.toString()}`)
    onListingNotifications({
      tenantId,
      page,
      keyword: "",
      severity: severity === "all" ? undefined : severity,
    }).then(({ records: notifications, total }) => {
      setNotifications(notifications)
      setTotal(total)
    })
    const interval = setInterval(() => setTimestamp(Date.now()), 1_0000)
    return () => clearInterval(interval)
  }, [tenantId, page, severity, router, setTotal])

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {/* {t("metadata.title")} */}
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("metadata.title")}</CardTitle>
            <CardDescription>{t("metadata.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <form ref={form} className="flex flex-wrap gap-4">
                <Select
                  value={severity}
                  onValueChange={(value) => setSeverity(value as Severities)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("filters.severity.name")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"all"}>
                      {t("filters.severity.options.all")}
                    </SelectItem>
                    <SelectItem value={`${Severities.Success}`}>
                      {t("filters.severity.options.success")}
                    </SelectItem>
                    <SelectItem value={`${Severities.Warning}`}>
                      {t("filters.severity.options.warning")}
                    </SelectItem>
                    <SelectItem value={`${Severities.Error}`}>
                      {t("filters.severity.options.error")}
                    </SelectItem>
                    <SelectItem value={`${Severities.Info}`}>
                      {t("filters.severity.options.info")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input type="hidden" name="page" value={String(page)} />
              </form>

              <div className="space-y-4 mt-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Card key={notification.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="mt-0.5">
                            {notification.severity === Severities.Success && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {notification.severity === Severities.Warning && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                            {notification.severity === Severities.Error && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            {notification.severity === Severities.Info && (
                              <Info className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium">
                                {__(`notifications.${notification.type}.title`)}
                              </h4>
                              <span className="text-xs text-muted-foreground ml-2">
                                {((moment, payload) =>
                                  __(`moments.${moment}`, payload))(
                                  ...toHumanReadable(
                                    notification.timestamp,
                                    timestamp,
                                  ),
                                )}
                              </span>
                            </div>
                            <p className="text-xs mt-1 text-muted-foreground">
                              {__(
                                `notifications.${notification.type}.description`,
                                notification.payload,
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {t("notices.no-notifications")}
                    </p>
                  </div>
                )}
              </div>

              <Paginator
                page={page}
                length={notifications.length}
                total={total}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
