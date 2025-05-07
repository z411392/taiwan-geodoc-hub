import TranscriptsTable from "@/components/tenants/[tenantId]/transcripts/table"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("/tenants/[tenantId]/transcripts")
  return {
    title: t("metadata.title"),
    description: t("metadata.title"),
  }
}

export default function TranscriptsPage() {
  return <TranscriptsTable />
}
