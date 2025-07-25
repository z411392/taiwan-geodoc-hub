"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useContainer as useParentContainer } from "~/composables/contexts/with-resolve-tenant"
import { type DependencyContainer } from "tsyringe"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import {
    TraceId,
    SnapshotId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

type Context = {
    snapshot: Snapshot
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function SnapshotProvider({
    children,
    snapshot,
    traceId,
}: {
    children: ReactNode
    snapshot: Snapshot
    traceId: string
}) {
    const container = useParentContainer().createChildContainer()
    container.register(TraceId, { useValue: traceId })
    container.register(SnapshotId, { useValue: snapshot.id })
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
