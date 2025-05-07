"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/retrieve-tenant"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/constants/events"
import { useContainer as useParentContainer } from "~/composables/providers/auth-provider"
import { type Scopes } from "@/taiwan-geodoc-hub/modules/access-managing/constants/scopes"
import { type DependencyContainer } from "tsyringe"
import {
    requestIdToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

type Context = {
    tenant: TenantWithRole
    notifications: Notification<EventTypes>[]
    scopes: Scopes[]
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function TenantProvider({
    children,
    tenant,
    notifications,
    scopes,
    requestId,
}: {
    children: ReactNode
    tenant: TenantWithRole
    notifications: Notification<EventTypes>[]
    scopes: Scopes[]
    requestId: string
}) {
    const container = useParentContainer().createChildContainer()
    container.register(requestIdToken, { useValue: requestId })
    container.register(tenantIdToken, { useValue: tenant.id })
    return (
        <context.Provider value={{ tenant, notifications, scopes, container }}>
            {children}
        </context.Provider>
    )
}

export const useTenant = () => {
    const { tenant } = useContext(context)
    return tenant
}

export const useNotifications = () => {
    const { notifications } = useContext(context)
    return notifications
}

export const useScopes = () => {
    const { scopes } = useContext(context)
    return scopes
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}
