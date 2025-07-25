"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn"
import { useTranslations } from "next-intl"
import { Home, FileText, CreditCard, Search, Users } from "lucide-react"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { Scope } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/scope"
import {
    useTenant,
    useScopes,
} from "~/composables/contexts/with-resolve-tenant"

export default function Sidebar() {
    const pathname = usePathname()
    const __ = useTranslations(Route.Tenant)
    const tenant = useTenant()
    const scopes = useScopes()
    return (
        <aside className="hidden w-64 flex-col border-r md:flex">
            <div className="flex flex-col gap-2 p-4">
                {scopes.includes(Scope.ViewDashboard) && (
                    <Link
                        href={Route.Dashboard.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Route.Dashboard.replace(
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
                {scopes.includes(Scope.BrowseSnapshots) && (
                    <Link
                        href={Route.Snapshots.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Route.Snapshots.replace(
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
                {scopes.includes(Scope.BrowseValuesCrawled) && (
                    <Link
                        href={Route.Values.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Route.Values.replace("[tenantId]", tenant.id),
                            )
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted",
                        )}
                    >
                        <Search className="h-4 w-4" />
                        {__("items.values")}
                    </Link>
                )}
                {scopes.includes(Scope.BrowseTransactions) && (
                    <Link
                        href={Route.Transactions.replace(
                            "[tenantId]",
                            tenant.id,
                        )}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Route.Transactions.replace(
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
                {scopes.includes(Scope.BrowseMembers) && (
                    <Link
                        href={Route.Members.replace("[tenantId]", tenant.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            pathname.startsWith(
                                Route.Members.replace("[tenantId]", tenant.id),
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
