"use client"


import { useTenant } from "~/composables/contexts/with-resolve-tenant"
import { useTranslations } from "next-intl"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import DashboardInsights from "~/components/(with-resolve-tenant)/dashboard-insights"
import Tutorials from "~/components/(with-resolve-tenant)/tutorials"

export default function () {
    const tenant = useTenant()
    const t = useTranslations(Route.Dashboard)
    return (
        <>
            <DashboardInsights />
            <Tutorials />
        </>
    )
}
