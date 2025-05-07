"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
    Bell,
    CheckCircle,
    AlertTriangle,
    Info,
    AlertCircle,
    ArrowRight,
} from "lucide-react"
import { Button } from "~/components/shadcn/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/shadcn/popover"
import { ScrollArea } from "~/components/shadcn/scroll-area"
import { cn } from "~/shadcn"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { HumanReadableFormatter } from "@/taiwan-geodoc-hub/infrastructure/formatters/human-readable-formatter"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useParams } from "next/navigation"
import { useContainer } from "~/composables/contexts/with-resolve-tenant"
import { useTick } from "~/composables/date-time"
import { CountUnreadNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/count-unread-notification-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"

const toHumanReadable = new HumanReadableFormatter()

export default function Notifications() {
    const [open, setOpen] = useState(false)
    const __ = useTranslations(Route.Tenant)
    const { tenantId } = useParams() as { tenantId: string }
    const [unreadCount, setUnreadCount] = useState<number>(0)
    const notifications = []
    const markAsRead = async (_notificationId: string) => {
        /**
         * @todo 須實作標示為已讀的 API
         */
    }
    const markAllAsRead = async () => {
        /**
         * @todo 須實作標示為已讀的 API
         */
    }
    const container = useContainer()
    const { millis: timestamp } = useTick()
    const countUnreadNotificationPort = container.resolve(
        CountUnreadNotificationPort as NonAbstractClass<CountUnreadNotificationPort>,
    )
    useEffect(() => {
        let cancel = false
        const run = async () => {
            const unreadCount = await countUnreadNotificationPort.count()
            if (cancel) return
            setUnreadCount(unreadCount)
        }
        run()
        return () => {
            cancel = true
        }
    }, [countUnreadNotificationPort])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">
                        {__("sections.notifications.title")}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">
                        {__("sections.notifications.title")}
                    </h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAllAsRead()}
                            className="text-xs h-8"
                        >
                            {__("buttons.mark-all-as-read")}
                        </Button>
                    )}
                </div>
                {notifications.length > 0 ? (
                    <>
                        <ScrollArea className="h-[300px]">
                            <div className="divide-y">
                                {notifications
                                    .slice(0, 5)
                                    .map((notification) => (
                                        <div
                                            key={""}
                                            className={cn(
                                                "p-4 cursor-pointer hover:bg-muted transition-colors",
                                                !notification.read &&
                                                    "bg-muted/50",
                                            )}
                                            onClick={() => markAsRead("")}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5">
                                                    {notification.severity ===
                                                        Severity.Success && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                    {notification.severity ===
                                                        Severity.Warning && (
                                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                    )}
                                                    {notification.severity ===
                                                        Severity.Error && (
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                    {notification.severity ===
                                                        Severity.Info && (
                                                        <Info className="h-4 w-4 text-blue-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <h4
                                                            className={cn(
                                                                "text-sm font-medium",
                                                                !notification.read &&
                                                                    "font-semibold",
                                                            )}
                                                        >
                                                            {""}
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
                                                                    0,
                                                                    timestamp,
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs mt-1 text-muted-foreground">
                                                        {""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </ScrollArea>
                        <div className="p-2 border-t">
                            <Link
                                href={Route.Notifications.replace(
                                    "[tenantId]",
                                    tenantId,
                                )}
                                onClick={() => setOpen(false)}
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between"
                                    size="sm"
                                >
                                    <span>{__("buttons.view-all")}</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            {__("sections.notifications.notices.empty")}
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
