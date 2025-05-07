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
import { Home, FileText, CreditCard, Search, Users, Menu } from "lucide-react"

export default function Hamburger({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const isMobile = useMobileDetection()
  const _ = useTranslations(Routes.Root)
  const __ = useTranslations(Routes.Tenant)
  if (!isMobile) return null
  return (
    <Sheet>
      <SheetTitle></SheetTitle>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only"></span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Link
              href={Routes.Dashboard.replace("[tenantId]", profile.tenant.id)}
              className="flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              <span className="font-bold">{_("header.app-name")}</span>
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
                {__("items.dashboard")}
              </Link>
            )}
            {profile.scopes.includes(Scopes.BrowseSnapshots) && (
              <Link
                href={Routes.Snapshots.replace("[tenantId]", profile.tenant.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  pathname.startsWith(
                    Routes.Snapshots.replace("[tenantId]", profile.tenant.id),
                  )
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <FileText className="h-4 w-4" />
                {__("items.snapshots")}
              </Link>
            )}
            {profile.scopes.includes(Scopes.BrowseValuesCrawled) && (
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
                {__("items.values")}
              </Link>
            )}
            {profile.scopes.includes(Scopes.BrowseTransactions) && (
              <Link
                href={Routes.Transactions.replace(
                  "[tenantId]",
                  profile.tenant.id,
                )}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                  pathname.startsWith(
                    Routes.Transactions.replace(
                      "[tenantId]",
                      profile.tenant.id,
                    ),
                  )
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <CreditCard className="h-4 w-4" />
                {__("items.transactions")}
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
                {__("items.members")}
              </Link>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
