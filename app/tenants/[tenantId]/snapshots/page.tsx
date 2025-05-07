import SnapshotsTable from "@/components/tenants/[tenantId]/snapshots/table"
import { getTranslations } from "next-intl/server"
import { Routes } from "@/lib/constants/routes"

export async function generateMetadata() {
  const t = await getTranslations(Routes.Snapshots)
  return {
    title: t("metadata.title"),
    description: t("metadata.title"),
  }
}

export default function SnapshotsPage() {
  return <SnapshotsTable />
}
