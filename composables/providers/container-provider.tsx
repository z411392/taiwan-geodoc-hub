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

type Context = {
    container: DependencyContainer
    setContainer: (container: DependencyContainer) => void
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ContainerProvider({
    children,
}: {
    children: ReactNode
}) {
    const [container, setContainer] = useState<DependencyContainer>(
        undefined as unknown as DependencyContainer,
    )
    useEffect(() => {
        bootstrap().then((container) => setContainer(container))
    }, [])
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
