"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useContainer as useParentContainer } from "~/composables/providers/tenant-provider"
import { type DependencyContainer } from "tsyringe"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import { createConsola } from "consola"
import {
    loggerToken,
    userIdToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

type Context = {
    snapshot: Snapshot
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function SnapshotProvider({
    children,
    snapshot,
}: {
    children: ReactNode
    snapshot: Snapshot
}) {
    const container = useParentContainer().createChildContainer()
    container.register(snapshotIdToken, { useValue: snapshot.id })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
            tenantId: container.resolve(tenantIdToken),
            snapshotId: container.resolve(snapshotIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
    return (
        <context.Provider value={{ snapshot, container }}>
            {children}
        </context.Provider>
    )
}

export const useSnapshot = () => {
    const { snapshot } = useContext(context)
    return snapshot
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}
