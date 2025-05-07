"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, CheckCircle } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/shadcn/popover"
import { ScrollArea } from "~/components/shadcn/scroll-area"
import { cn } from "~/shadcn"
import { useTranslations } from "next-intl"
import { HumanReadableFormatter } from "@/taiwan-geodoc-hub/infrastructure/formatters/human-readable-formatter"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useParams } from "next/navigation"
import { useTick } from "~/composables/use-tick"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { type NotificationWithReadStatus } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { MarkNotificationAsReadPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/mark-notification-as-read-port"
import { Loader2 } from "lucide-react"
import ViewAllButton from "~/components/(with-resolve-tenant)/header/inbox/view-all-button"
import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
import { useNotifications as useNotificationsData } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/notifications-provider"

const useNotifications = () => {
    const { unread: unreadData, notifications: notificationsData } =
        useNotificationsData()
    const [unread, setUnread] = useState<number>(unreadData)
    const [notifications, setNotifications] =
        useState<NotificationWithReadStatus[]>(notificationsData)
    const container = useContainer()
    const markNotificationAsReadPort = container.resolve(
        MarkNotificationAsReadPort as NonAbstractClass<MarkNotificationAsReadPort>,
    )
    const [progressingNotifications, setProgressingNotifications] = useState<{
        [notificationId: string]: boolean
    }>({})

    const markAsRead = async (notificationId: string) => {
        const index = notifications.findIndex(
            (notification) => notification.id === notificationId,
        )
        if (index === -1) return
        const notification = notifications[index]
        if (notification.read) return
        setProgressingNotifications({
            ...progressingNotifications,
            [notificationId]: true,
        })
        try {
            await markNotificationAsReadPort.markAsRead(notificationId)
            notification.read = true
            notifications[index] = notification
            setNotifications(notifications)
            setUnread(unread - 1)
        } catch {
        } finally {
            setProgressingNotifications({
                ...progressingNotifications,
                [notificationId]: false,
            })
        }
    }
    return {
        unread,
        notifications,
        markAsRead,
        progressingNotifications,
    }
}

const toHumanReadable = new HumanReadableFormatter()
const pageSize = 20

export default function () {
    const [open, setOpen] = useState(false)
    const t = useTranslations("(with-resolve-tenant)/header/inbox")
    const _ = useTranslations("_")
    const { tenantId } = useParams() as { tenantId: string }
    const { unread, notifications, markAsRead, progressingNotifications } =
        useNotifications()
    const { millis: timestamp } = useTick()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unread > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                            {unread > pageSize ? `${pageSize}+` : unread}
                        </span>
                    )}
                    <span className="sr-only">{t("title")}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">{t("title")}</h3>
                </div>
                {notifications.length > 0 ? (
                    <>
                        <ScrollArea className="h-[300px]">
                            <div className="divide-y">
                                {notifications
                                    .slice(0, 5)
                                    .map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                "p-4 cursor-pointer hover:bg-muted transition-colors",
                                                !notification.read &&
                                                    "bg-muted/50",
                                            )}
                                            onClick={() =>
                                                markAsRead(notification.id)
                                            }
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5">
                                                    {progressingNotifications[
                                                        notification.id
                                                    ] && (
                                                        <>
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        </>
                                                    )}
                                                    {notification.read && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
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
                                                            {_(
                                                                `topic.${notification.source.topic}.name`,
                                                            )}
                                                        </h4>
                                                        <span className="text-xs text-muted-foreground ml-2">
                                                            {((
                                                                moment,
                                                                payload,
                                                            ) =>
                                                                _(
                                                                    `moment.${moment}`,
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
                                                        {_(
                                                            `topic.${notification.source.topic}.description`,
                                                            notification.payload,
                                                        )}
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
                                <ViewAllButton />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            {t("description")}
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
