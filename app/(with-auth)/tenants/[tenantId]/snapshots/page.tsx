import SnapshotsTable from "~/components/tenants/[tenantId]/snapshots/table"
import { getTranslations } from "next-intl/server"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"

export const generateMetadata = async () => {
    const t = await getTranslations(Pages.Snapshots)
    return {
        title: t("metadata.title"),
        description: t("metadata.title"),
    }
}

export default function SnapshotsPage() {
    return <SnapshotsTable />
}
