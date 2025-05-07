import { Button } from "~/components/shadcn/button"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "~/components/shadcn/sheet"
import { usePathname } from "next/navigation"
import useIsOnMobile from "~/composables/use-mobile-detection"
import Link from "next/link"
import { cn } from "~/shadcn"
import { useTranslations } from "next-intl"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { Scopes } from "@/taiwan-geodoc-hub/modules/access-managing/constants/scopes"
import { Home, FileText, CreditCard, Search, Users, Menu } from "lucide-react"
import { useTenant, useScopes } from "~/composables/providers/tenant-provider"

export default function Hamburger() {
    const pathname = usePathname()
    const isOnMobile = useIsOnMobile()
    const _ = useTranslations(Pages.Root)
    const __ = useTranslations(Pages.Tenant)
    const tenant = useTenant()
    const scopes = useScopes()
    if (!isOnMobile) return null
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
                            href={Pages.Dashboard.replace(
                                "[tenantId]",
                                tenant.id,
                            )}
                            className="flex items-center gap-2"
                        >
                            <FileText className="h-5 w-5" />
                            <span className="font-bold">
                                {_("header.app-name")}
                            </span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {scopes.includes(Scopes.ViewDashboard) && (
                            <Link
                                href={Pages.Dashboard.replace(
                                    "[tenantId]",
                                    tenant.id,
                                )}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(
                                        Pages.Dashboard.replace(
                                            "[tenantId]",
                                            tenant.id,
                                        ),
                                    )
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted",
                                )}
                            >
                                <Home className="h-4 w-4" />
                                {__("items.dashboard")}
                            </Link>
                        )}
                        {scopes.includes(Scopes.BrowseSnapshots) && (
                            <Link
                                href={Pages.Snapshots.replace(
                                    "[tenantId]",
                                    tenant.id,
                                )}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(
                                        Pages.Snapshots.replace(
                                            "[tenantId]",
                                            tenant.id,
                                        ),
                                    )
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted",
                                )}
                            >
                                <FileText className="h-4 w-4" />
                                {__("items.snapshots")}
                            </Link>
                        )}
                        {scopes.includes(Scopes.BrowseValuesCrawled) && (
                            <Link
                                href={Pages.Values.replace(
                                    "[tenantId]",
                                    tenant.id,
                                )}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(
                                        Pages.Values.replace(
                                            "[tenantId]",
                                            tenant.id,
                                        ),
                                    )
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted",
                                )}
                            >
                                <Search className="h-4 w-4" />
                                {__("items.values")}
                            </Link>
                        )}
                        {scopes.includes(Scopes.BrowseTransactions) && (
                            <Link
                                href={Pages.Transactions.replace(
                                    "[tenantId]",
                                    tenant.id,
                                )}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(
                                        Pages.Transactions.replace(
                                            "[tenantId]",
                                            tenant.id,
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
                        {scopes.includes(Scopes.BrowseMembers) && (
                            <Link
                                href={Pages.Members.replace(
                                    "[tenantId]",
                                    tenant.id,
                                )}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(
                                        Pages.Members.replace(
                                            "[tenantId]",
                                            tenant.id,
                                        ),
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
