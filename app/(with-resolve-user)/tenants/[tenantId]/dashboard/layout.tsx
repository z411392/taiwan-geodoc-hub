import { type ReactNode } from "react"
import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import TopUpButton from "~/components/(with-resolve-tenant)/top-up-button"
import UploadSnapshotButton from "~/components/(with-resolve-tenant)/upload-snapshot-button"
import CrawlValuesButton from "~/components/(with-resolve-tenant)/crawl-values"
import { startupWithResolveTenant } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-tenant"
import { context } from "@/taiwan-geodoc-hub/utils/lifespan/context"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.Dashboard)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

export default async function ({ params, children }: { params: Promise<{ tenantId: string }>, children: ReactNode }) {
    const t = await getTranslations(Route.Dashboard)
    const { tenantId } = await params
    await startupWithResolveTenant(tenantId)
    const tenant = context.tenant!
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {t("metadata.title")}
                </h1>
                <div className="flex gap-2">
                    <UploadSnapshotButton />
                    <CrawlValuesButton />
                    <TopUpButton currentPoints={tenant.points} />
                </div>
            </div>
            {children}
        </div>
    )
}
