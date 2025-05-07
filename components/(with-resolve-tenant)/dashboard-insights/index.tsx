"use client"

import { useTenant } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
import Balance from "~/components/(with-resolve-tenant)/dashboard-insights/balance"
import Unlocking from "~/components/(with-resolve-tenant)/dashboard-insights/unlocking"
import Crawling from "~/components/(with-resolve-tenant)/dashboard-insights/crawling"
import Team from "~/components/(with-resolve-tenant)/dashboard-insights/team"
import { useDashboardInsights } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/dashboard-insights-provider"

export default function () {
    const tenant = useTenant()
    const insights = useDashboardInsights()
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Balance
                points={tenant.points}
                lastTopUpTimestamp={insights.lastTopUpTimestamp}
            />
            <Unlocking
                unlockedRegistrations={insights.unlockedRegistrations}
                monthlyUnlockedRegistrations={
                    insights.monthlyUnlockedRegistrations
                }
            />
            <Crawling crawlTimes={0} monthlyCrawlTimes={0} />
            <Team
                users={insights.users}
                sevenDaysActiveUsers={insights.sevenDaysActiveUsers}
            />
        </div>
    )
}
