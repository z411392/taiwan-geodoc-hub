"use client"

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react"
import { type DependencyContainer } from "tsyringe"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import { requestIdToken } from "~/lib/taiwan-geodoc-hub/infrastructure/constants/types"

type Context = {
    container: DependencyContainer
    setContainer: (container: DependencyContainer) => void
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ContainerProvider({
    requestId,
    children,
}: {
    requestId: string
    children: ReactNode
}) {
    const [container, setContainer] = useState<DependencyContainer>(
        undefined as unknown as DependencyContainer,
    )
    useEffect(() => {
        bootstrap().then((container) => {
            container.register(requestIdToken, { useValue: requestId })
            setContainer(container)
        })
    }, [requestId])
    if (!container) return null
    return (
        <context.Provider value={{ container, setContainer }}>
            {children}
        </context.Provider>
    )
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}
