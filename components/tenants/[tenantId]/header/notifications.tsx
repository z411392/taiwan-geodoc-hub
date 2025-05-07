"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { cn } from "@/shadcn"
import { type Notification } from "@/lib/adapters/notification-dao"
import { useEffect } from "react"
import { onListingNotifications } from "@/lib/modules/notifying/presentation/controllers/on-listing-notifications"
import { useTranslations } from "next-intl"
import { type EventTypes } from "@/lib/constants/events"
import { toHumanReadable } from "@/lib/infrastructure/formatters/time"
import { Severities } from "@/lib/constants/severities"
import { Routes } from "@/lib/constants/routes"

export default function Notifications({ tenantId }: { tenantId: string }) {
  const [notifications, setNotifications] = useState<
    Notification<EventTypes>[]
  >([])
  const [open, setOpen] = useState(false)
  const __ = useTranslations(Routes.Tenant)
  const [timestamp, setTimestamp] = useState<number>(Date.now())

  useEffect(() => {
    onListingNotifications({ tenantId, page: 1, keyword: "" }).then(
      ({ records: notifications }) => {
        setNotifications(notifications)
      },
    )
    const interval = setInterval(() => setTimestamp(Date.now()), 1_0000)
    return () => clearInterval(interval)
  }, [tenantId])

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    )
  }

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
          <span className="sr-only">{__("sections.notifications.title")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">{__("sections.notifications.title")}</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
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
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 cursor-pointer hover:bg-muted transition-colors",
                      !notification.read && "bg-muted/50",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
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
                          <h4
                            className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold",
                            )}
                          >
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
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t">
              <Link
                href={Routes.Notifications.replace("[tenantId]", tenantId)}
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
