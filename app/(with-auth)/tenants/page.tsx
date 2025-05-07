import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { getTranslations } from "next-intl/server"
import TenantsList from "~/components/(with-auth)/tenants/tenants-list"

export default async function TenantsPage() {
    return <TenantsList />
}

export const generateMetadata = async () => {
    const t = await getTranslations(Route.TenantSelection)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}
