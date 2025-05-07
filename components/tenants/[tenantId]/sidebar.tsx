"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shadcn"
import { type Profile } from "@/lib/modules/access-managing/application/queries/retrieve-profile"
import { useTranslations } from "next-intl"
import { Home, FileText, CreditCard, Search, Users } from "lucide-react"
import { Routes } from "@/lib/constants/routes"
import { Scopes } from "@/lib/constants/scopes"

export default function Sidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const t = useTranslations("/tenants/[tenantId]")
  return (
    <aside className="hidden w-64 flex-col border-r md:flex">
      <div className="flex flex-col gap-2 p-4">
        {profile.scopes.includes(Scopes.ViewDashboard) && (
          <Link
            href={Routes.Dashboard.replace("[tenantId]", profile.tenant.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(
                Routes.Dashboard.replace("[tenantId]", profile.tenant.id),
              )
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <Home className="h-4 w-4" />
            {t("items.dashboard")}
          </Link>
        )}
        {profile.scopes.includes(Scopes.BrowseTranscripts) && (
          <Link
            href={Routes.Transcripts.replace("[tenantId]", profile.tenant.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(
                Routes.Transcripts.replace("[tenantId]", profile.tenant.id),
              )
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <FileText className="h-4 w-4" />
            {t("items.transcripts")}
          </Link>
        )}
        {profile.scopes.includes(Scopes.BrowseAnnouncedValuesCrawled) && (
          <Link
            href={Routes.Values.replace("[tenantId]", profile.tenant.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(
                Routes.Values.replace("[tenantId]", profile.tenant.id),
              )
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <Search className="h-4 w-4" />
            {t("items.values")}
          </Link>
        )}
        {profile.scopes.includes(Scopes.BrowsePointsHistory) && (
          <Link
            href={Routes.PointsHistory.replace("[tenantId]", profile.tenant.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(
                Routes.PointsHistory.replace("[tenantId]", profile.tenant.id),
              )
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <CreditCard className="h-4 w-4" />
            {t("items.points")}
          </Link>
        )}
        {profile.scopes.includes(Scopes.BrowseMembers) && (
          <Link
            href={Routes.Members.replace("[tenantId]", profile.tenant.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(
                Routes.Members.replace("[tenantId]", profile.tenant.id),
              )
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <Users className="h-4 w-4" />
            {t("items.members")}
          </Link>
        )}
      </div>
    </aside>
  )
}
