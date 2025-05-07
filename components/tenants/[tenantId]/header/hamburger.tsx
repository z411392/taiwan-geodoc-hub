import { Button } from "@/components/shadcn/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet"
import { usePathname } from "next/navigation"
import useMobileDetection from "@/composables/use-mobile-detection"
import Link from "next/link"
import { type Profile } from "@/lib/modules/access-managing/application/queries/retrieve-profile"
import { cn } from "@/shadcn"
import { useTranslations } from "next-intl"
import { Routes } from "@/lib/constants/routes"
import { Scopes } from "@/lib/constants/scopes"
import {
  Home,
  FileText,
  CreditCard,
  Search,
  Building2,
  Users,
  Menu,
} from "lucide-react"

export default function Hamburger({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const isMobile = useMobileDetection()
  const t = useTranslations("/tenants/[tenantId]")
  if (!isMobile) return null
  return (
    <Sheet>
      <SheetTitle></SheetTitle>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">開啟選單</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-bold">地政小幫手</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-2">
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
                href={Routes.Transcripts.replace(
                  "[tenantId]",
                  profile.tenant.id,
                )}
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
                href={Routes.PointsHistory.replace(
                  "[tenantId]",
                  profile.tenant.id,
                )}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  pathname.startsWith(
                    Routes.PointsHistory.replace(
                      "[tenantId]",
                      profile.tenant.id,
                    ),
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
            {profile.scopes.includes(Scopes.ChangeTenantSettings) && (
              <Link
                href={Routes.Tenant.replace("[tenantId]", profile.tenant.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  pathname.startsWith(
                    Routes.Tenant.replace("[tenantId]", profile.tenant.id),
                  )
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <Building2 className="h-4 w-4" />
                {t("items.settings")}
              </Link>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
