"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"
import { type Plan } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/plan"

type Context = {
    contactInfo: ContactInfo
    plans: Plan[]
}
const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    contactInfo,
    plans,
}: Context & { children: ReactNode }) {
    return (
        <context.Provider
            value={{
                contactInfo,
                plans,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useTopUpInfo = () => {
    const { contactInfo, plans } = useContext(context)
    return {
        contactInfo,
        plans,
    }
}
