"use client"

import { type ReactNode } from "react"
import { createContext, useContext } from "react"
import { type User } from "~/auth/user"
import { useContainer as useParentContainer } from "~/composables/providers/container-provider"
import { type DependencyContainer } from "tsyringe"
import { createConsola } from "consola"
import {
    loggerToken,
    idTokenToken,
    userIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"

type Context = {
    user: User | undefined
    idToken: string | undefined
    container: DependencyContainer
}

export const context = createContext<Context>(undefined as unknown as Context)

export default function AuthProvider({
    user,
    idToken,
    children,
}: {
    children: ReactNode
    user: User
    idToken: string
}) {
    const container = useParentContainer().createChildContainer()
    container.register(idTokenToken, { useValue: idToken })
    container.register(userIdToken, { useValue: user.uid })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
    return (
        <context.Provider value={{ user, idToken, container }}>
            {children}
        </context.Provider>
    )
}

export const useUser = () => {
    const { user } = useContext(context)
    return user
}

export const useIdToken = () => {
    const { idToken } = useContext(context)
    return idToken
}

export const useContainer = () => {
    const { container } = useContext(context)
    return container
}
