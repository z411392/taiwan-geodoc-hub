import DashboardInsights from "~/components/(with-resolve-tenant)/dashboard-insights"
import Tutorials from "~/components/(with-resolve-tenant)/tutorials"
import { startupWithResolveTenant } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-tenant"
import DashboardInsightsProvider from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/dashboard-insights-provider"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { RetrieveDashboardInsightsPort } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/retrieve-dashboard-insights-port"

export default async function ({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) {
    const { tenantId } = (await params) as { tenantId: string }
    const container = await startupWithResolveTenant(tenantId)
    const retrieveDashboardInsightsPort = container.resolve(
        RetrieveDashboardInsightsPort as NonAbstractClass<RetrieveDashboardInsightsPort>,
    )
    const dashboardInsights =
        await retrieveDashboardInsightsPort.dashboardInsights()
    return (
        <>
            <DashboardInsightsProvider {...dashboardInsights}>
                <DashboardInsights />
            </DashboardInsightsProvider>
            <Tutorials />
        </>
    )
}
