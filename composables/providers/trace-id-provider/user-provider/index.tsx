"use client"

import { type ReactNode } from "react"
import { createContext, useContext } from "react"
import { type User } from "~/auth/user"
import { useContainer as useParentContainer } from "~/composables/providers/trace-id-provider"
import { type DependencyContainer } from "tsyringe"
import {
    IdToken,
    UserId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

type Context = {
    user: User
    idToken: string
    container: DependencyContainer
}

export const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    user,
    idToken,
    children,
}: Omit<Context, "container"> & { children: ReactNode }) {
    const container = useParentContainer().createChildContainer()
    container.register(IdToken, { useValue: idToken })
    container.register(UserId, { useValue: user.uid })
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
