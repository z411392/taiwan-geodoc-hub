import { type DashboardInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/dashboard-insights"
import {
    useContainer,
    useTenant,
} from "~/composables/contexts/with-resolve-tenant"
import { RetrieveDashboardInsightsPort } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/retrieve-dashboard-insights-port"
import { useEffect, useState } from "react"
import { NonAbstractClass } from "~/src/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import Balance from "~/components/(with-resolve-tenant)/dashboard-insights/balance"
import Unlocking from "~/components/(with-resolve-tenant)/dashboard-insights/unlocking"
import Crawling from "~/components/(with-resolve-tenant)/dashboard-insights/crawling"
import Team from "~/components/(with-resolve-tenant)/dashboard-insights/team"

const useDashboardInsights = () => {
    const container = useContainer()
    const retrieveDashboardInsightsPort = container.resolve(
        RetrieveDashboardInsightsPort as NonAbstractClass<RetrieveDashboardInsightsPort>,
    )
    const [insights, setInsights] = useState<DashboardInsights>({
        lastTopUpTimestamp: 0,
        monthlyUnlockedRegistrations: 0,
        sevenDaysActiveUsers: 0,
        unlockedRegistrations: 0,
        users: 0,
    })
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const run = async () => {
            setIsLoading(true)
            const insights =
                await retrieveDashboardInsightsPort.dashboardInsights()
            setInsights(insights)
            setIsLoading(false)
        }
        run()
    }, [])
    return {
        insights,
        isLoading,
    }
}

export default function () {
    const tenant = useTenant()
    const { insights, isLoading } = useDashboardInsights()
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Balance
                points={tenant.points}
                lastTopUpTimestamp={insights.lastTopUpTimestamp}
                isLoading={isLoading}
            />
            <Unlocking
                unlockedRegistrations={insights.unlockedRegistrations}
                monthlyUnlockedRegistrations={
                    insights.monthlyUnlockedRegistrations
                }
                isLoading={isLoading}
            />
            <Crawling isLoading={isLoading} />
            <Team
                users={insights.users}
                sevenDaysActiveUsers={insights.sevenDaysActiveUsers}
                isLoading={isLoading}
            />
        </div>
    )
}
