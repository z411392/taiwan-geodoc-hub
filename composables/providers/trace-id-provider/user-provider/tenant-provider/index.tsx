"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useContainer as useParentContainer } from "~/composables/providers/trace-id-provider/user-provider"
import { type Scope } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/scope"
import { type DependencyContainer } from "tsyringe"
import { TenantId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"

type Context = {
    tenant: TenantWithRole
    scopes: Scope[]
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    tenant,
    scopes,
}: Omit<Context, "container"> & { children: ReactNode }) {
    const container = useParentContainer().createChildContainer()
    container.register(TenantId, { useValue: tenant.id })
    return (
        <context.Provider
            value={{
                tenant,
                scopes,
                container,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useTenant = () => {
    const { tenant } = useContext(context)
    return tenant
}

export const useScopes = () => {
    const { scopes } = useContext(context)
    return scopes
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}
