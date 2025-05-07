import { type ReactNode } from "react"
import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import TopUp from "~/components/(with-resolve-tenant)/top-up"
import UploadSnapshot from "~/components/(with-resolve-tenant)/upload-snapshot"
import CrawlValues from "~/components/(with-resolve-tenant)/crawl-values"
import { startupWithResolveTenant } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-tenant"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { RetrieveContactInfoPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/retrieve-contact-info-port"
import { SearchPlanPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/search-plan-port"
import TopUpInfoProvider from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/top-up-info-provider"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.Dashboard)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

export default async function ({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ tenantId: string }>
}) {
    const { tenantId } = (await params) as { tenantId: string }
    const t = await getTranslations(Route.Dashboard)
    const container = await startupWithResolveTenant(tenantId)
    const retrieveContactInfoPort = container.resolve(
        RetrieveContactInfoPort as NonAbstractClass<RetrieveContactInfoPort>,
    )
    const searchPlanPort = container.resolve(
        SearchPlanPort as NonAbstractClass<SearchPlanPort>,
    )

    const [contactInfo, plans] = await Promise.all([
        retrieveContactInfoPort.contactInfo(),
        searchPlanPort.search(),
    ])
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {t("metadata.title")}
                </h1>
                <div className="flex gap-2">
                    <UploadSnapshot />
                    <CrawlValues />
                    <TopUpInfoProvider contactInfo={contactInfo} plans={plans}>
                        <TopUp />
                    </TopUpInfoProvider>
                </div>
            </div>
            {children}
        </div>
    )
}
