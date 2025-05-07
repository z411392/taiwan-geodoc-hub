"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useContainer as useParentContainer } from "~/composables/providers/tenant-provider"
import { type DependencyContainer } from "tsyringe"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import {
    requestIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

type Context = {
    snapshot: Snapshot
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function SnapshotProvider({
    children,
    snapshot,
    requestId,
}: {
    children: ReactNode
    snapshot: Snapshot
    requestId: string
}) {
    const container = useParentContainer().createChildContainer()
    container.register(requestIdToken, { useValue: requestId })
    container.register(snapshotIdToken, { useValue: snapshot.id })
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
