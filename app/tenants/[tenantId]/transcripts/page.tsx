import TranscriptsTable from "@/components/tenants/[tenantId]/transcripts/table"
import { getTranslations } from "next-intl/server"
import { Routes } from "@/lib/constants/routes"

export async function generateMetadata() {
  const t = await getTranslations(Routes.Transcripts)
  return {
    title: t("metadata.title"),
    description: t("metadata.title"),
  }
}

export default function TranscriptsPage() {
  return <TranscriptsTable />
}
