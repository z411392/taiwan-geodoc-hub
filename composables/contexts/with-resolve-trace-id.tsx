"use client"

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react"
import { type DependencyContainer } from "tsyringe"
import { startup } from "@/taiwan-geodoc-hub/utils/lifespan"
import { TraceId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

type Context = {
    container: DependencyContainer
    setContainer: (container: DependencyContainer) => void
}
const context = createContext<Context>(undefined as unknown as Context)

export default function TraceIdProvider({
    traceId,
    children,
}: {
    traceId: string
    children: ReactNode
}) {
    const [container, setContainer] = useState<DependencyContainer>(
        undefined as unknown as DependencyContainer,
    )
    useEffect(() => {
        startup().then((container) => {
            container.register(TraceId, { useValue: traceId })
            setContainer(container)
        })
    }, [traceId])
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
