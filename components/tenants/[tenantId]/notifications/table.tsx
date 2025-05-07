"use client"

import { useState, useEffect, useMemo } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/shadcn/select"
import { useSearchParams, useRouter } from "next/navigation"
import { Severities } from "@/taiwan-geodoc-hub/infrastructure/constants/severities"
import { CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react"
import { useTranslations } from "next-intl"
import { toHumanReadable } from "@/taiwan-geodoc-hub/infrastructure/utils/formatters/to-human-readable"
import { Input } from "~/components/shadcn/input"
import Paginator from "~/components/tenants/[tenantId]/paginator"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { useContainer } from "~/composables/providers/tenant-provider"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/constants/events"
import { ListNotifications } from "@/taiwan-geodoc-hub/modules/notifying/application/list-notifications"
import { useTick } from "~/composables/date-time"

const useQueryParams = () => {
    const searchParams = useSearchParams()
    const initSeverity = (): Severities | "all" => {
        const severity = searchParams.get("severity")
        return Object.values(Severities).includes(severity as Severities)
            ? (severity as Severities)
            : "all"
    }
    const initPage = (): number => {
        const page = parseInt(searchParams.get("page") || "1")
        return isNaN(page) || page < 1 ? 1 : page
    }

    const [severity, setSeverity] = useState<Severities | "all">(initSeverity())
    const [page, setPage] = useState<number>(initPage())
    const router = useRouter()
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("severity", severity)
        params.set("page", String(page))
        const next = `?${params.toString()}`
        if (next !== window.location.search)
            router.replace(next, { scroll: false })
    }, [severity, page, router])
    return {
        severity,
        setSeverity,
        page,
        setPage,
    }
}

export default function NotificationsTable() {
    const [notifications, setNotifications] = useState<
        Notification<EventTypes>[]
    >([])
    const t = useTranslations(Pages.Notifications)
    const __ = useTranslations(Pages.Tenant)

    const [total, setTotal] = useState<number>(0)
    const [loaded, setLoaded] = useState(false)
    const { severity, setSeverity, page, setPage } = useQueryParams()

    const container = useContainer()
    const listNotifications = useMemo(
        () => container.resolve(ListNotifications),
        [container],
    )
    const { millis: timestamp } = useTick()
    useEffect(() => {
        let cancelled = false
        setLoaded(false)
        const run = async () => {
            const { records: notifications, total } = await listNotifications(
                severity === "all" ? undefined : severity,
                page,
            )
            if (cancelled) return
            setNotifications(notifications)
            setTotal(total)
            setLoaded(true)
        }
        run()
        return () => {
            cancelled = true
        }
    }, [page, severity, setTotal, listNotifications])

    if (!loaded) return null

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
                        <CardDescription>
                            {t("metadata.description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <form className="flex flex-wrap gap-4">
                                <Select
                                    value={severity}
                                    onValueChange={(value) =>
                                        setSeverity(value as Severities)
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                            placeholder={t(
                                                "filters.severity.name",
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"all"}>
                                            {t("filters.severity.options.all")}
                                        </SelectItem>
                                        <SelectItem
                                            value={`${Severities.Success}`}
                                        >
                                            {t(
                                                "filters.severity.options.success",
                                            )}
                                        </SelectItem>
                                        <SelectItem
                                            value={`${Severities.Warning}`}
                                        >
                                            {t(
                                                "filters.severity.options.warning",
                                            )}
                                        </SelectItem>
                                        <SelectItem
                                            value={`${Severities.Error}`}
                                        >
                                            {t(
                                                "filters.severity.options.error",
                                            )}
                                        </SelectItem>
                                        <SelectItem
                                            value={`${Severities.Info}`}
                                        >
                                            {t("filters.severity.options.info")}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="hidden"
                                    name="page"
                                    value={String(page)}
                                />
                            </form>

                            <div className="space-y-4 mt-4">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <Card
                                            key={notification.id}
                                            className="overflow-hidden"
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                                                    <div className="mt-0.5">
                                                        {notification.severity ===
                                                            Severities.Success && (
                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                        )}
                                                        {notification.severity ===
                                                            Severities.Warning && (
                                                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                        )}
                                                        {notification.severity ===
                                                            Severities.Error && (
                                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                                        )}
                                                        {notification.severity ===
                                                            Severities.Info && (
                                                            <Info className="h-4 w-4 text-blue-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <h4 className="text-sm font-medium">
                                                                {__(
                                                                    `notifications.${notification.type}.title`,
                                                                )}
                                                            </h4>
                                                            <span className="text-xs text-muted-foreground ml-2">
                                                                {((
                                                                    moment,
                                                                    payload,
                                                                ) =>
                                                                    __(
                                                                        `moments.${moment}`,
                                                                        payload,
                                                                    ))(
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
