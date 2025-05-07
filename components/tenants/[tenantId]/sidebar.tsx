"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn"
import { useTranslations } from "next-intl"
import { Home, FileText, CreditCard, Search, Users } from "lucide-react"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { Scopes } from "@/taiwan-geodoc-hub/modules/access-managing/constants/scopes"
import { useTenant, useScopes } from "~/composables/providers/tenant-provider"

export default function Sidebar() {
    const pathname = usePathname()
    const __ = useTranslations(Pages.Tenant)
    const tenant = useTenant()
    const scopes = useScopes()
    return (
        <aside className="hidden w-64 flex-col border-r md:flex">
            <div className="flex flex-col gap-2 p-4">
                {scopes.includes(Scopes.ViewDashboard) && (
                    <Link
                        href={Pages.Dashboard.replace("[tenantId]", tenant.id)}
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
                        href={Pages.Snapshots.replace("[tenantId]", tenant.id)}
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
                        href={Pages.Values.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Pages.Values.replace("[tenantId]", tenant.id),
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
                        href={Pages.Members.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Pages.Members.replace("[tenantId]", tenant.id),
                            )
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted",
                        )}
                    >
                        <Users className="h-4 w-4" />
                        {__("items.members")}
                    </Link>
                )}
            </div>
        </aside>
    )
}
