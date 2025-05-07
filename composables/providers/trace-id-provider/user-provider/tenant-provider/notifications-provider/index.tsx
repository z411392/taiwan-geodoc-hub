"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type NotificationWithReadStatus } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"

type Context = {
    unread: number
    total: number
    notifications: NotificationWithReadStatus[]
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    unread,
    total,
    notifications,
}: Context & { children: ReactNode }) {
    return (
        <context.Provider
            value={{
                total,
                unread,
                notifications,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useNotifications = () => {
    const { notifications, total, unread } = useContext(context)
    return {
        notifications,
        total,
        unread,
    }
}
