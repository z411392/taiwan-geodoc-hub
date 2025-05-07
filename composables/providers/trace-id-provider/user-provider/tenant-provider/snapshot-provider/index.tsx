"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useContainer as useParentContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
import { type DependencyContainer } from "tsyringe"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import { SnapshotId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

type Context = {
    snapshot: Snapshot
    container: DependencyContainer
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    snapshot,
}: Context & { children: ReactNode }) {
    const container = useParentContainer().createChildContainer()
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
