"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"

type Context = DashboardInsights

const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    ...dashboardInsights
}: DashboardInsights & { children: ReactNode }) {
    return (
        <context.Provider
            value={{
                ...dashboardInsights,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useDashboardInsights = () => {
    const { ...dashboardInsights } = useContext(context)
    return { ...dashboardInsights }
}
