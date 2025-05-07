"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/application/queries/retrieve-tenant"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/events"
import { useContainer as useParentContainer } from "~/composables/providers/auth-provider"
import { type Scopes } from "@/taiwan-geodoc-hub/modules/access-managing/constants/scopes"
import { type DependencyContainer } from "tsyringe"
import { createConsola } from "consola"
import {
    loggerToken,
    userIdToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

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
}: {
    children: ReactNode
    tenant: TenantWithRole
    notifications: Notification<EventTypes>[]
    scopes: Scopes[]
}) {
    const container = useParentContainer().createChildContainer()
    container.register(tenantIdToken, { useValue: tenant.id })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
            tenantId: container.resolve(tenantIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
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
