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
import { useRef } from "react"

type Context = {
    container: DependencyContainer
    traceId: string
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    traceId,
    children,
}: Omit<Context, "container"> & { children: ReactNode }) {
    const [container, setContainer] = useState<DependencyContainer>(
        undefined as unknown as DependencyContainer,
    )
    useEffect(() => {
        startup(true).then((container) => {
            container.register(TraceId, { useValue: traceId })
            setContainer(container)
        })
    }, [traceId])
    if (!container) return null
    return (
        <context.Provider value={{ container, traceId }}>
            {children}
        </context.Provider>
    )
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}

export const useTraceId = () => {
    const { traceId } = useContext(context)
    return traceId
}

export const useFormRef = () => {
    const traceId: string = useTraceId()
    const formRef = useRef<HTMLFormElement>(undefined)
    useEffect(() => {
        formRef.current = window[traceId as keyof Window]
    }, [])
    return formRef
}
