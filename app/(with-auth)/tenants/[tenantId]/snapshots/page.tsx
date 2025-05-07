import SnapshotsTable from "~/components/tenants/[tenantId]/snapshots/table"
import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.Snapshots)
    return {
        title: t("metadata.title"),
        description: t("metadata.title"),
    }
}

export default function SnapshotsPage() {
    return <SnapshotsTable />
}
